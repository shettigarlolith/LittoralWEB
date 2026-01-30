import heroBanner from '@/assets/hero-banner.png';
import idliImg from '@/assets/idli.jpg';
import dosaImg from '@/assets/dosa.jpg';
import ragiDosaImg from '@/assets/ragi-dosa.jpg';
import upmaImg from '@/assets/upma.jpg';
import pongalImg from '@/assets/pongal.jpg';
import vadaImg from '@/assets/vada.jpg';
import appamImg from '@/assets/appam.jpg';

export const images = {
  heroBanner,
  idli: idliImg,
  dosa: dosaImg,
  ragiDosa: ragiDosaImg,
  upma: upmaImg,
  pongal: pongalImg,
  vada: vadaImg,
  appam: appamImg,
};

// Map product IDs to images
export const productImages: Record<string, string> = {
  '1': idliImg,        // Idli Mix
  '2': dosaImg,        // Dosa Mix
  '3': ragiDosaImg,    // Ragi Dosa Mix
  '4': ragiDosaImg,    // Multigrain Dosa Mix (reuse)
  '5': upmaImg,        // Upma Mix
  '6': pongalImg,      // Pongal Mix
  '7': vadaImg,        // Vada Mix
  '8': pongalImg,      // Instant Sambar Mix (reuse)
  '9': idliImg,        // Puttu Mix (reuse)
  '10': appamImg,      // Appam Mix
  '11': idliImg,       // Rava Idli Mix
  '12': pongalImg,     // Bajra Khichdi Mix (reuse)
  '13': dosaImg,       // Adai Mix (reuse)
  '14': upmaImg,       // Poha Mix (reuse)
  '15': idliImg,       // Kozhukattai Mix (reuse)
  '16': ragiDosaImg,   // Jowar Roti Mix (reuse)
  '17': pongalImg,     // Chicken Biryani Mix (reuse)
  '18': dosaImg,       // Egg Curry Masala (reuse)
};

export const getProductImage = (productId: string): string => {
  return productImages[productId] || idliImg;
};
