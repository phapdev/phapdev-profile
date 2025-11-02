import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { BLOG_POSTS_DATA, BLOG_CATEGORIES } from '../../constants';
import type { BlogPost, BlogCategory } from '../../types';

// Simple Markdown to JSX Renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const renderedContent = useMemo(() => {
        // Split by code blocks first to preserve their content
        const parts = content.split(/(```[\s\S]*?```)/);

        return parts.map((part, partIndex) => {
            if (part.startsWith('```')) {
                const codeContent = part.replace(/```.*\n/, '').replace(/```/, '').trim();
                return (
                    <pre key={partIndex} className="glassmorphism p-4 rounded-md my-4 font-mono text-sm overflow-x-auto bg-primary/5 border border-primary/20">
                        <code>{codeContent}</code>
                    </pre>
                );
            }

            // Process non-code blocks
            const blocks = part.trim().split(/\n\s*\n/);
            return blocks.map((block, blockIndex) => {
                if (!block.trim()) return null;
                const key = `${partIndex}-${blockIndex}`;
                
                if (block.startsWith('# ')) return <h1 key={key} className="text-3xl font-bold text-glow mt-6 mb-3">{block.substring(2)}</h1>;
                if (block.startsWith('## ')) return <h2 key={key} className="text-2xl font-bold text-primary mt-5 mb-2">{block.substring(3)}</h2>;
                if (block.startsWith('- ') || block.startsWith('* ')) {
                    const items = block.split('\n').map((item, i) => (
                        <li key={i} className="mb-1">{item.substring(2)}</li>
                    ));
                    return <ul key={key} className="list-disc list-inside space-y-1 my-4 pl-4 text-accent/90">{items}</ul>;
                }
                return <p key={key} className="text-accent/80 my-4 leading-relaxed">{block}</p>;
            });
        });
    }, [content]);

    return <div className="prose-holographic">{renderedContent}</div>;
};


const BlogCard: React.FC<{ post: BlogPost; onSelect: () => void }> = ({ post, onSelect }) => (
  <motion.div
    layoutId={`blog-card-${post.id}`}
    onClick={onSelect}
    className="glassmorphism rounded-lg overflow-hidden cursor-pointer group relative p-6 flex flex-col"
    whileHover={{ scale: 1.03, boxShadow: '0 0 20px var(--color-secondary)' }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="grow">
      <div className="flex items-center justify-between text-xs text-primary/80 mb-2">
          <span className="flex items-center gap-1.5"><Tag size={12}/> {post.category}</span>
          <span className="flex items-center gap-1.5"><Calendar size={12}/> {post.date}</span>
      </div>
      <h3 className="text-xl font-bold text-primary group-hover:text-glow transition-all">{post.title}</h3>
      <p className="text-sm text-accent/70 mt-3">{post.excerpt}</p>
    </div>
    <div className="mt-4">
        <span className="font-semibold text-secondary text-sm group-hover:text-glow">Read More &rarr;</span>
    </div>
  </motion.div>
);

const BlogPostDetail: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => (
    <motion.div
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div layoutId={`blog-card-${post.id}`} className="glassmorphism rounded-lg p-6 md:p-8 h-full flex flex-col">
            <div className="shrink-0">
                <button onClick={onClose} className="flex items-center gap-2 text-sm text-primary hover:text-glow mb-6">
                    <ArrowLeft size={16} /> Back to Data Logs
                </button>
                <div className="flex items-center justify-between text-xs text-primary/80 mb-2">
                    <span className="flex items-center gap-1.5"><Tag size={12}/> {post.category}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12}/> {post.date}</span>
                </div>
                <h1 className="text-4xl font-bold text-glow mb-6">{post.title}</h1>
            </div>
            <div className="grow overflow-y-auto pr-2">
                <MarkdownRenderer content={post.content} />
            </div>
        </motion.div>
    </motion.div>
);

export const BlogPage: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'All') {
            return BLOG_POSTS_DATA;
        }
        return BLOG_POSTS_DATA.filter(post => post.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="h-full flex flex-col p-0 md:p-4">
            <AnimatePresence mode="wait">
                {selectedPost ? (
                    <BlogPostDetail key={selectedPost.id} post={selectedPost} onClose={() => setSelectedPost(null)} />
                ) : (
                    <motion.div 
                      key="list-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-glow mb-4 shrink-0">Data Logs</h1>
                        <div className="flex flex-wrap gap-2 mb-6 shrink-0">
                            <button 
                                onClick={() => setActiveCategory('All')} 
                                className={`px-3 py-1 text-sm rounded-full transition-all ${activeCategory === 'All' ? 'bg-primary text-base font-bold' : 'bg-primary/10 text-primary/80 hover:bg-primary/20'}`}
                            >
                                All
                            </button>
                            {BLOG_CATEGORIES.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-1 text-sm rounded-full transition-all ${activeCategory === cat ? 'bg-primary text-base font-bold' : 'bg-primary/10 text-primary/80 hover:bg-primary/20'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="grow overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map(post => (
                                    <BlogCard key={post.id} post={post} onSelect={() => setSelectedPost(post)} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};