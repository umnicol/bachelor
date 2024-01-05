// components/VideoCard/VideoCard.tsx
import React from 'react';
import Image from 'next/image';
import styles from './VideoCard.module.scss';
import Link from 'next/link';

interface VideoCardProps {
  video: {
    title: string;
    previewPath: string;
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
      <div className={styles.videoCard}>
        <Link href={`/preview/${encodeURIComponent(video.previewPath)}`}>
            <div className={styles.previewContainer}>
              <Image src={video.previewPath} alt={video.title} width={300} height={200} className={styles.videoImage} />
              <div className={styles.titleOverlay}>{video.title}</div>
            </div>
        </Link>
      </div>
    );
  };

export default VideoCard;
