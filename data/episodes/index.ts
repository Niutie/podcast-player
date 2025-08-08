// 播客数据类型定义
export interface PodcastEpisodeData {
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

// 导入所有播客数据
import { episode30 } from './episode-30';
import { episode29 } from './episode-29';
import { episode28 } from './episode-28';
import { episode27 } from './episode-27';
import { episode26 } from './episode-26';
import { episode25 } from './episode-25';
import { episode24 } from './episode-24';
import { episode23 } from './episode-23';
import { episode22 } from './episode-22';
import { episode21 } from './episode-21';

// 所有播客数据数组
export const allEpisodes: PodcastEpisodeData[] = [
  episode30,
  episode29,
  episode28,
  episode27,
  episode26,
  episode25,
  episode24,
  episode23,
  episode22,
  episode21
];

// 获取所有分类
export const getAllCategories = (): string[] => {
  const categories = allEpisodes.map(episode => episode.category);
  return [...new Set(categories)];
};

// 根据ID获取播客
export const getEpisodeById = (id: string): PodcastEpisodeData | undefined => {
  return allEpisodes.find(episode => episode.id === id);
};

// 获取最新播客
export const getLatestEpisode = (): PodcastEpisodeData | undefined => {
  return allEpisodes.find(episode => episode.isLatest);
};

// 获取往期播客
export const getPreviousEpisodes = (): PodcastEpisodeData[] => {
  return allEpisodes.filter(episode => !episode.isLatest);
};