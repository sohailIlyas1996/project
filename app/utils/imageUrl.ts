export function decodeFirebaseUrl(url: string): string {
  try {
    // First decode the URL to handle any double-encoded characters
    const decodedUrl = decodeURIComponent(url);
    
    // If the URL contains %2F, replace it with a forward slash
    return decodedUrl.replace(/%2F/g, '/');
  } catch (error) {
    console.error('Error decoding Firebase URL:', error);
    return url;
  }
} 