import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface PodcastPlayerProps {
  audioUrl: string;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onDurationLoaded?: (duration: string) => void; // 新增：当时长加载完成时的回调
}

export function PodcastPlayer({ 
  audioUrl, 
  title, 
  onPlayStateChange,
  onDurationLoaded 
}: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
        
        // 通知父组件时长已加载
        if (onDurationLoaded) {
          const formattedDuration = formatDuration(audio.duration);
          onDurationLoaded(formattedDuration);
        }
      }
    };

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => updateDuration();
    const handleCanPlay = () => updateDuration();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    });

    // 立即尝试获取时长
    if (audio.readyState >= 1) {
      updateDuration();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [onPlayStateChange, onDurationLoaded]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
      onPlayStateChange?.(!isPlaying);
    } catch (error) {
      console.error('播放错误:', error);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = value[0];
    setVolume(value[0]);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;
    audio.currentTime = Math.min(audio.currentTime + 15, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;
    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '--:--';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDuration = (time: number) => {
    if (isNaN(time) || time === 0) return '--分钟';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    if (minutes === 0) {
      return `${seconds}秒`;
    } else if (seconds === 0) {
      return `${minutes}分钟`;
    } else {
      return `${minutes}分${seconds}秒`;
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        preload="metadata"
        crossOrigin="anonymous"
      />
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          className="w-full"
          disabled={isLoading}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{isLoading ? '加载中...' : formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={skipBackward}
          disabled={isLoading}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-background border-t-foreground"></div>
          ) : isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={skipForward}
          disabled={isLoading}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          max={1}
          step={0.1}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
      </div>
    </div>
  );
}