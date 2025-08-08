// 新播客模板 - 复制此文件并重命名为 episode-XX.ts
// 然后在 index.ts 中的 episodeFiles 数组中添加新的文件名

export const episodeXX = {
  id: 'XX', // 播客期数，如 '31'
  title: '第XX期：播客标题', // 播客标题
  description: '播客详细描述，包括本期内容要点、讨论话题等。', // 播客描述
  imageUrl: 'https://images.unsplash.com/photo-XXXXXXXXXX?w=400&h=300&fit=crop', // 播客封面图片
  audioUrl: 'https://your-audio-cdn.com/episode-XX.mp3', // 音频文件URL
  publishDate: '2024-XX-XX', // 发布日期，格式：YYYY-MM-DD
  category: '分类名称', // 播客分类，如：'数字化转型'、'项目管理'等
  isLatest: false // 是否为最新期，只有一期应该设为 true
};

// 使用说明：
// 1. 复制此文件并重命名为 episode-XX.ts（XX为期数）
// 2. 修改上面的 episodeXX 为对应的变量名，如 episode31
// 3. 填写所有必要信息
// 4. 在 index.ts 的 episodeFiles 数组顶部添加新文件名
// 5. 在 index.ts 的导入语句中添加新的导入
// 6. 在 allEpisodes 数组顶部添加新的播客数据
//
// 示例：
// export const episode31 = {
//   id: '31',
//   title: '第31期：云原生架构设计与实践',
//   description: '深入探讨云原生技术栈的选择与架构设计...',
//   imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
//   audioUrl: 'https://example.com/episode-31.mp3',
//   publishDate: '2024-08-14',
//   category: '技术架构',
//   isLatest: true
// };