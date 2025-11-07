import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS, FF, FS } from '../../constants';

const DiscussionForumsDetails = (props: any) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  // Mock data for discussion forums
  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'General'];

  const forumPosts = [
    {
      id: '1',
      title: 'Best Practices for Remote Team Collaboration',
      author: 'Sarah Johnson',
      authorAvatar: '👩‍💼',
      category: 'Business',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      views: 156,
      isLiked: false,
      isBookmarked: false,
      content: 'I\'ve been managing remote teams for 3 years now. Here are some key strategies that have worked well for us: 1. Daily standups, 2. Clear communication channels, 3. Regular one-on-ones...',
      tags: ['remote-work', 'team-management', 'collaboration'],
      isPinned: true,
      authorRole: 'Team Lead',
      authorCompany: 'TechCorp',
    },
    {
      id: '2',
      title: 'React Native Performance Optimization Tips',
      author: 'Mike Chen',
      authorAvatar: '👨‍💻',
      category: 'Technology',
      timestamp: '4 hours ago',
      likes: 18,
      comments: 12,
      views: 89,
      isLiked: true,
      isBookmarked: true,
      content: 'After working on several React Native projects, I\'ve compiled a list of performance optimization techniques that can significantly improve your app\'s performance...',
      tags: ['react-native', 'performance', 'mobile-development'],
      isPinned: false,
      authorRole: 'Senior Developer',
      authorCompany: 'MobileFirst',
    },
    {
      id: '3',
      title: 'Design System Implementation Guide',
      author: 'Emma Davis',
      authorAvatar: '👩‍🎨',
      category: 'Design',
      timestamp: '6 hours ago',
      likes: 31,
      comments: 15,
      views: 203,
      isLiked: false,
      isBookmarked: false,
      content: 'Creating a consistent design system is crucial for product success. Here\'s my step-by-step approach that has worked across multiple projects...',
      tags: ['design-system', 'ui-ux', 'consistency'],
      isPinned: false,
      authorRole: 'UX Designer',
      authorCompany: 'DesignStudio',
    },
    {
      id: '4',
      title: 'Marketing Strategies for SaaS Products',
      author: 'David Wilson',
      authorAvatar: '👨‍💼',
      category: 'Marketing',
      timestamp: '1 day ago',
      likes: 22,
      comments: 6,
      views: 134,
      isLiked: true,
      isBookmarked: false,
      content: 'Marketing SaaS products requires a different approach compared to traditional products. Here are proven strategies that have helped us grow...',
      tags: ['saas', 'marketing', 'growth'],
      isPinned: false,
      authorRole: 'Marketing Director',
      authorCompany: 'SaaS Solutions',
    },
    {
      id: '5',
      title: 'Freelancing vs Full-time: My Experience',
      author: 'Lisa Brown',
      authorAvatar: '👩‍💻',
      category: 'General',
      timestamp: '2 days ago',
      likes: 45,
      comments: 23,
      views: 312,
      isLiked: false,
      isBookmarked: true,
      content: 'I\'ve done both freelancing and full-time work. Here\'s my honest comparison of the pros and cons based on my 5-year experience...',
      tags: ['freelancing', 'career', 'work-life'],
      isPinned: false,
      authorRole: 'Freelance Developer',
      authorCompany: 'Independent',
    },
    {
      id: '6',
      title: 'AI Tools for Productivity: 2024 Edition',
      author: 'Alex Kumar',
      authorAvatar: '👨‍🔬',
      category: 'Technology',
      timestamp: '3 days ago',
      likes: 67,
      comments: 19,
      views: 445,
      isLiked: true,
      isBookmarked: true,
      content: 'The AI landscape has evolved rapidly. Here are the most effective AI tools I\'ve been using to boost productivity in 2024...',
      tags: ['ai', 'productivity', 'tools'],
      isPinned: false,
      authorRole: 'AI Researcher',
      authorCompany: 'Innovation Labs',
    },
  ];

  useEffect(() => {
    setPosts(forumPosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    Alert.alert(
      'Create New Discussion',
      'Share your thoughts and start a conversation with the community.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create Post', onPress: () => console.log('Navigate to create post screen') },
      ]
    );
  };

  const handlePostPress = (post: any) => {
    Alert.alert(
      'View Full Discussion',
      `Would you like to read the complete discussion for "${post.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Read More', onPress: () => console.log('Navigate to post details:', post.id) },
      ]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderCategory = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.selectedCategoryChip,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.selectedCategoryText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.postCard, item.isPinned && styles.pinnedPost]}
      onPress={() => handlePostPress(item)}
    >
      {item.isPinned && (
        <View style={styles.pinnedBadge}>
          <Text style={styles.pinnedText}>📌 Pinned</Text>
        </View>
      )}

      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.authorAvatarContainer}>
            <Text style={styles.authorAvatar}>{item.authorAvatar}</Text>
          </View>
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.authorRole}>{item.authorRole} • {item.authorCompany}</Text>
            <Text style={styles.postTimestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={3}>
        {item.content}
      </Text>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag: any, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Text style={styles.actionIcon}>{item.isLiked ? '❤️' : '🤍'}</Text>
          <Text style={[styles.actionText, item.isLiked && styles.likedText]}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>👁️</Text>
          <Text style={styles.actionText}>{item.views}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleBookmark(item.id)}
        >
          <Text style={styles.actionIcon}>
            {item.isBookmarked ? '🔖' : '📖'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Technology': '#E3F2FD',
      'Business': '#E8F5E8',
      'Design': '#FFF3E0',
      'Marketing': '#FCE4EC',
      'General': '#F3E5F5',
    };
    return colors[category] || '#F5F5F5';
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent
        Title="Discussion Forums"
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <Text style={styles.welcomeIcon}>💬</Text>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Join the Conversation</Text>
              <Text style={styles.welcomeSubtitle}>
                Connect with professionals, share insights, and learn from the community
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search discussions, topics, or tags..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={COLORS.GREY_TEXT}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map(renderCategory)}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
            onPress={() => setActiveTab('trending')}
          >
            <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
              🔥 Trending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
            onPress={() => setActiveTab('recent')}
          >
            <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
              ⏰ Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'my-posts' && styles.activeTab]}
            onPress={() => setActiveTab('my-posts')}
          >
            <Text style={[styles.tabText, activeTab === 'my-posts' && styles.activeTabText]}>
              👤 My Posts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Create Post Button */}
        <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
          <View style={styles.createPostContent}>
            <Text style={styles.createPostIcon}>✍️</Text>
            <View style={styles.createPostTextContainer}>
              <Text style={styles.createPostText}>Start a Discussion</Text>
              <Text style={styles.createPostSubtext}>Share your thoughts with the community</Text>
            </View>
            <Text style={styles.createPostArrow}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Posts List */}
        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>
            {filteredPosts.length} Discussion{filteredPosts.length !== 1 ? 's' : ''}
          </Text>
          <FlatList
            data={filteredPosts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
  },
  welcomeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: COLORS.GREY_TEXT,
  },
  searchInput: {
    flex: 1,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
  },
  clearIcon: {
    fontSize: 16,
    color: COLORS.GREY_TEXT,
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: COLORS.BLACK,
  },
  categoryText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  selectedCategoryText: {
    color: COLORS.WHITE,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  activeTabText: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
  },
  createPostButton: {
    backgroundColor: COLORS.BLACK,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 16,
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  createPostIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  createPostTextContainer: {
    flex: 1,
  },
  createPostText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    marginBottom: 2,
  },
  createPostSubtext: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#CCCCCC',
  },
  createPostArrow: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontFamily: FF[600],
  },
  postsContainer: {
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pinnedPost: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  pinnedBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  pinnedText: {
    fontSize: FS.FS10,
    fontFamily: FF[500],
    color: '#856404',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  authorAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  authorAvatar: {
    fontSize: 20,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 2,
  },
  authorRole: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
  },
  postTimestamp: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: FS.FS10,
    fontFamily: FF[500],
    color: COLORS.BLACK,
  },
  postTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 8,
    lineHeight: 22,
  },
  postContent: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: FS.FS10,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  actionText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  likedText: {
    color: '#FF6B6B',
    fontFamily: FF[600],
  },
});

export default DiscussionForumsDetails;