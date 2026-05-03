// functions/api/upload-image.js
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const formData = await request.formData();
    const file = formData.get('image'); // Matches FormData.append('image', ...)

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No image file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Only image files are allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sanitize filename & create unique path
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `care-logs/${Date.now()}-${safeName}`;

    // Upload to R2 (binding name must match dashboard setup)
    await env.CARE_LOG_R2.put(key, file.stream(), {
      httpMetadata: { contentType: file.type }
    });

    // Return public URL (configure R2_PUBLIC_URL in CF Dashboard → Settings → Environment Variables)
    const baseUrl = env.R2_PUBLIC_URL || `https://${env.R2_BUCKET_NAME}.<account-id>.r2.cloudflarestorage.com`;
    const url = `${baseUrl}/${key}`;

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    return new Response(JSON.stringify({ error: 'Server upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}