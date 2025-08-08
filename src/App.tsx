import React, { useState, useMemo } from 'react';
import { PodcastEpisode } from './components/PodcastEpisode';
import { SearchAndFilter } from './components/SearchAndFilter';
import { ScrollArea } from './components/ui/scroll-area';
import { Separator } from './components/ui/separator';
import { Button } from './components/ui/button';
import { MoreHorizontal } from 'lucide-react';

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

// 播客数据 - 临时内联数据
const podcastEpisodes: PodcastEpisodeData[] = [
  {
    id: '30',
    title: '第30期：数字化转型的关键策略与实践案例',
    description: '本期节目深入探讨企业数字化转型的核心要素，分享来自不同行业的成功案例。我们将讨论如何制定数字化战略、选择合适的技术栈，以及如何管理变革过程中的挑战。特别关注中小企业在数字化转型中的痛点和解决方案。',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-08-07',
    category: '数字化转型',
    isLatest: true
  },
  {
    id: '29',
    title: '第29期：敏捷项目管理的最佳实践',
    description: '深入讲解敏捷项目管理方法论，包括Scrum、Kanban等框架的实际应用。分享如何组建高效的敏捷团队，设置合理的迭代周期，以及如何处理客户需求变更。',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-07-31',
    category: '项目管理'
  },
  {
    id: '28',
    title: '第28期：人工智能在企业培训中的应用',
    description: '探讨AI技术如何革新企业培训模式，包括个性化学习路径、智能评估系统、虚拟培训助手等创新应用。分析AI培训工具的选择标准和实施策略。',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-07-24',
    category: '人工智能'
  },
  {
    id: '27',
    title: '第27期：远程团队协作工具与技巧',
    description: '分享远程工作环境下的团队协作经验，推荐实用的协作工具，讨论如何建立有效的沟通机制，保持团队凝聚力和工作效率。',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-07-17',
    category: '团队协作'
  },
  {
    id: '26',
    title: '第26期：数据驱动的业务决策制定',
    description: '教授如何利用数据分析来支持业务决策，包括数据收集方法、分析工具使用、可视化技巧，以及如何将数据洞察转化为实际的业务行动。',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-07-10',
    category: '数据分析'
  },
  {
    id: '25',
    title: '第25期：领导力发展的关键要素',
    description: '分析现代领导者需要具备的核心能力，包括情商管理、沟通技巧、决策能力、团队激励等。分享领导力培养的实用方法和工具。',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-07-03',
    category: '领导力'
  },
  {
    id: '24',
    title: '第24期：客户服务体验优化策略',
    description: '深入分析客户服务的关键触点，分享如何通过技术手段和流程改进来提升客户满意度。讨论多渠道客服体系的建设和管理。',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-06-26',
    category: '客户服务'
  },
  {
    id: '23',
    title: '第23期：企业文化建设与员工激励',
    description: '探讨如何建立积极的企业文化，设计有效的员工激励机制。分析不同类型企业的文化建设案例和最佳实践。',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-06-19',
    category: '企业文化'
  },
  {
    id: '22',
    title: '第22期：供应链管理数字化转型',
    description: '分析供应链管理中的数字化机遇，包括智能仓储、预测分析、供应商协作平台等。分享供应链优化的实际案例。',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-06-12',
    category: '供应链'
  },
  {
    id: '21',
    title: '第21期：市场营销自动化工具应用',
    description: '详解营销自动化工具的选择和应用，包括客户细分、营销活动设计、效果跟踪等。帮助企业提升营销效率和ROI。',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    publishDate: '2024-06-05',
    category: '市场营销'
  }
];

// 每页显示的往期内容数量
const EPISODES_PER_PAGE = 5;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visibleEpisodesCount, setVisibleEpisodesCount] = useState(EPISODES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = podcastEpisodes.map(episode => episode.category);
    return [...new Set(cats)];
  }, []);

  // Filter episodes based on search and category
  const filteredEpisodes = useMemo(() => {
    return podcastEpisodes.filter(episode => {
      const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           episode.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || episode.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const latestEpisode = filteredEpisodes.find(episode => episode.isLatest);
  const otherEpisodes = filteredEpisodes.filter(episode => !episode.isLatest);
  
  // 当前显示的往期内容
  const visibleOtherEpisodes = otherEpisodes.slice(0, visibleEpisodesCount);
  const hasMoreEpisodes = otherEpisodes.length > visibleEpisodesCount;

  // 加载更多往期内容
  const loadMoreEpisodes = () => {
    setIsLoading(true);
    // 模拟加载延迟
    setTimeout(() => {
      setVisibleEpisodesCount(prev => prev + EPISODES_PER_PAGE);
      setIsLoading(false);
    }, 500);
  };

  // 重置搜索和筛选时，重置显示数量
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleEpisodesCount(EPISODES_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleEpisodesCount(EPISODES_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 p-4">
          <h1 className="text-center mb-4">企业培训播客</h1>
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-6">
            {/* Latest Episode */}
            {latestEpisode && (
              <div>
                <h2 className="mb-4">本期内容</h2>
                <PodcastEpisode {...latestEpisode} />
              </div>
            )}

            {/* Previous Episodes */}
            {visibleOtherEpisodes.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2>往期回顾</h2>
                    <span className="text-sm text-muted-foreground">
                      显示 {visibleOtherEpisodes.length} / {otherEpisodes.length} 期
                    </span>
                  </div>
                  <div className="space-y-4">
                    {visibleOtherEpisodes.map((episode) => (
                      <PodcastEpisode key={episode.id} {...episode} />
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasMoreEpisodes && (
                    <div className="flex justify-center mt-6">
                      <Button
                        variant="outline"
                        onClick={loadMoreEpisodes}
                        disabled={isLoading}
                        className="w-full max-w-xs"
                      >
                        {isLoading ? (
                          <>
                            <MoreHorizontal className="h-4 w-4 mr-2 animate-pulse" />
                            加载中...
                          </>
                        ) : (
                          <>
                            <MoreHorizontal className="h-4 w-4 mr-2" />
                            加载更多往期内容
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* No Results */}
            {filteredEpisodes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>没有找到匹配的播客内容</p>
                <p className="text-sm mt-2">试试调整搜索关键词或筛选条件</p>
              </div>
            )}

            {/* No More Episodes Message */}
            {otherEpisodes.length > 0 && !hasMoreEpisodes && visibleEpisodesCount > EPISODES_PER_PAGE && (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">已显示全部往期内容</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}