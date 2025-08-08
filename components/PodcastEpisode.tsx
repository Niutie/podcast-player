import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PodcastPlayer } from './PodcastPlayer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Clock } from 'lucide-react';

// 播客数据类型定义
interface PodcastEpisodeData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  publishDate: string;
  category: string;
  isLatest?: boolean;
  duration?: string;
}

interface PodcastEpisodeProps extends PodcastEpisodeData {
  isLatest?: boolean;
}

export function PodcastEpisode({
  id,
  title,
  description,
  imageUrl,
  audioUrl,
  duration: initialDuration,
  publishDate,
  category,
  isLatest = false
}: PodcastEpisodeProps) {
  const [isExpanded, setIsExpanded] = useState(isLatest);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(initialDuration || '--分钟');

  const handleDurationLoaded = (loadedDuration: string) => {
    setDuration(loadedDuration);
  };

  return (
    <Card className={`w-full ${isLatest ? 'border-primary' : ''}`}>
      <CardContent className="p-0">
        {/* Episode Image */}
        <div className="relative">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {isLatest && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              最新期
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-black/60 text-white"
          >
            {category}
          </Badge>
        </div>

        <div className="p-4 space-y-4">
          {/* Episode Info */}
          <div className="space-y-2">
            <h3 className="line-clamp-2">{title}</h3>
            
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            </div>

            <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
              {description}
            </p>
            
            {!isLatest && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-auto p-0 text-primary"
              >
                {isExpanded ? '收起' : '展开详情'}
              </Button>
            )}
          </div>

          {/* Player - Only show when expanded or is latest */}
          {(isExpanded || isLatest) && (
            <PodcastPlayer
              audioUrl={audioUrl}
              title={title}
              onPlayStateChange={setIsPlaying}
              onDurationLoaded={handleDurationLoaded}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}