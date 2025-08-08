# 播客数据管理指南

## 文件结构
```
/data/episodes/
├── index.ts              # 数据加载器和工具函数
├── episode-template.ts   # 新播客模板文件
├── episode-30.ts         # 第30期播客数据
├── episode-29.ts         # 第29期播客数据
└── ...                   # 其他播客数据文件
```

## 添加新播客的步骤

### 1. 创建新的播客数据文件
复制 `episode-template.ts` 文件：
```bash
cp episode-template.ts episode-31.ts
```

### 2. 编辑新播客数据
打开 `episode-31.ts` 并修改内容：
```typescript
export const episode31 = {
  id: '31',
  title: '第31期：您的播客标题',
  description: '播客描述...',
  imageUrl: 'https://images.unsplash.com/photo-xxx',
  audioUrl: 'https://your-cdn.com/episode-31.mp3',
  publishDate: '2024-08-14',
  category: '播客分类',
  isLatest: true  // 记得将之前的最新期设为 false
};
```

### 3. 更新 index.ts
在 `index.ts` 中添加新播客：

1. 在 `episodeFiles` 数组顶部添加：
```typescript
const episodeFiles = [
  'episode-31', // 新增
  'episode-30',
  // ... 其他文件
];
```

2. 添加导入语句：
```typescript
import { episode31 } from './episode-31';
```

3. 在 `allEpisodes` 数组顶部添加：
```typescript
export const allEpisodes: PodcastEpisodeData[] = [
  episode31, // 新增
  episode30,
  // ... 其他播客
];
```

### 4. 更新最新期标记
确保只有一期播客的 `isLatest` 设为 `true`，将之前的最新期改为 `false`。

## 数据类型定义

```typescript
interface PodcastEpisodeData {
  id: string;           // 播客期数
  title: string;        // 播客标题
  description: string;  // 播客描述
  imageUrl: string;     // 封面图片URL
  audioUrl: string;     // 音频文件URL
  publishDate: string;  // 发布日期 (YYYY-MM-DD)
  category: string;     // 播客分类
  isLatest?: boolean;   // 是否为最新期
  duration?: string;    // 时长（可选，会自动获取）
}
```

## 注意事项

1. **音频时长**：`duration` 字段是可选的，播放器会自动获取音频文件的实际时长
2. **图片尺寸**：推荐使用 400x300 像素的图片
3. **分类管理**：新分类会自动出现在筛选选项中
4. **发布日期**：请使用 YYYY-MM-DD 格式
5. **最新期标记**：确保只有一期设为 `isLatest: true`

## 工具函数

- `getAllCategories()`: 获取所有分类
- `getEpisodeById(id)`: 根据ID获取播客
- `getLatestEpisode()`: 获取最新播客
- `getPreviousEpisodes()`: 获取往期播客
```