import QRCode from 'qrcode';

export const generateQRCode = async (productId: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(productId);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}; 