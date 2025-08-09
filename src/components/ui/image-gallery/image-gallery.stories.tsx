import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ModalImageGallery } from './image-gallery';
import { CircularIconButton } from '../buttons/circular-icon-button/circular-icon-button';

const meta: Meta<typeof ModalImageGallery> = {
  title: 'UI/Image Gallery',
  component: ModalImageGallery,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-valid-attr-value',
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
];

export const SingleImage: Story = {
  args: {
    srcList: [sampleImages[0]],
    galleryTitle: 'Single Nature Photo',
    trigger: <CircularIconButton icon={PhotoIcon} label="Open single image gallery" />,
  },
};

export const MultipleImages: Story = {
  args: {
    srcList: sampleImages,
    galleryTitle: 'Nature Photo Gallery',
    trigger: (
      <CircularIconButton
        icon={PhotoIcon}
        label="Open image gallery with multiple photos"
      />
    ),
  },
};

export const EmptyGallery: Story = {
  args: {
    srcList: [],
    galleryTitle: 'Empty Gallery',
    trigger: <CircularIconButton icon={PhotoIcon} label="Open empty image gallery" />,
  },
};

export const WithImageTrigger: Story = {
  args: {
    srcList: sampleImages,
    galleryTitle: 'Thumbnail Gallery',
    trigger: (
      <img
        src={sampleImages[0]}
        alt="Gallery thumbnail - click to open image gallery"
        className="h-20 w-20 cursor-pointer rounded object-cover hover:opacity-80"
        role="button"
        tabIndex={0}
      />
    ),
  },
};
