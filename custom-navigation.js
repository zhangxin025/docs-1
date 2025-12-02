/**
 * Mintlify 自定义导航菜单脚本
 * 功能：
 * - 导航菜单交互增强
 * - 分组展开/收起状态保存
 * - 点击事件追踪
 * - 平滑滚动
 */

(function() {
  'use strict';

  const CONFIG = {
    storageKey: 'mintlify-nav-state',
    animationDuration: 300
  };

  /**
   * 初始化导航菜单
   */
  function initNavigation() {
    // 添加图标到菜单项
    addIconsToMenuItems();
    
  }

  /**
   * 为菜单项添加 home 图标
   */
  function addIconsToMenuItems() {
    // 为页面链接 li 项添加 home 图标
    document.querySelectorAll('#sidebar-group li').forEach(item => {
      // 检查是否已经添加了图标
      if (!item.querySelector('.nav-item-icon')) {
        const link = item.querySelector('a');
        if (link) {
          // 创建图标元素
          const icon = document.createElement('span');
          icon.className = 'nav-item-icon';
          icon.innerHTML = '<span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-blue-400/20 dark:bg-blue-400/20 text-blue-700 dark:text-blue-400">POST</span>';
       
          icon.style.opacity = '0.7';
          icon.style.transition = 'opacity 0.2s ease';
          
          // 在链接的第一个子元素前插入图标
          const flexContainer = link.querySelector('.flex-1');
          if (flexContainer) {
            flexContainer.insertBefore(icon, flexContainer.firstChild);
          } else {
            link.insertBefore(icon, link.firstChild);
          }
          
          // 悬停时改变图标透明度
          item.addEventListener('mouseenter', function() {
            icon.style.opacity = '1';
          });
          
          item.addEventListener('mouseleave', function() {
            icon.style.opacity = '0.7';
          });
        }
      }
    });
  }

  /**
   * 恢复导航状态
   */
  function restoreNavState() {
    try {
      const saved = localStorage.getItem(CONFIG.storageKey);
      if (saved) {
        const state = JSON.parse(saved);
        
        document.querySelectorAll('.sidebar-nav-group').forEach(group => {
          const title = group.querySelector('.sidebar-nav-group-title');
          if (title) {
            const groupName = title.textContent.trim();
            if (state[groupName] !== undefined) {
              if (state[groupName]) {
                group.classList.remove('collapsed');
                group.classList.add('expanded');
              } else {
                group.classList.add('collapsed');
                group.classList.remove('expanded');
              }
            }
          }
        });
      }
    } catch (e) {
      console.warn('[Navigation] Failed to restore state:', e);
    }
  }

  /**
   * 保存导航状态
   */
  function saveNavState() {
    try {
      const state = {};
      
      document.querySelectorAll('.sidebar-nav-group').forEach(group => {
        const title = group.querySelector('.sidebar-nav-group-title');
        if (title) {
          const groupName = title.textContent.trim();
          state[groupName] = group.classList.contains('expanded');
        }
      });
      
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn('[Navigation] Failed to save state:', e);
    }
  }

  /**
   * 设置分组点击事件
   */
  function setupGroupClickHandlers() {
    document.querySelectorAll('.sidebar-nav-group-title').forEach(title => {
      title.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const group = this.closest('.sidebar-nav-group');
        if (!group) return;
        
        const isExpanded = group.classList.contains('expanded');
        
        if (isExpanded) {
          // 收起分组
          group.classList.remove('expanded');
          group.classList.add('collapsed');
        } else {
          // 展开分组
          group.classList.remove('collapsed');
          group.classList.add('expanded');
        }
        
        // 保存状态
        saveNavState();
        
        // 埋点追踪
        trackGroupToggle(this.textContent.trim(), !isExpanded);
      });
    });
  }

  /**
   * 设置页面链接点击事件
   */
  function setupPageClickHandlers() {
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.addEventListener('click', function(e) {
        // 移除其他活跃状态
        document.querySelectorAll('.sidebar-nav-item.active').forEach(el => {
          el.classList.remove('active');
        });
        
        // 添加活跃状态到当前项
        this.classList.add('active');
        
        // 埋点追踪
        trackPageClick(this.textContent.trim());
      });
      
      // 监听鼠标悬停
      item.addEventListener('mouseenter', function() {
        // 可以在这里添加预加载逻辑
      });
    });
  }

  /**
   * 观察页面变化（MutationObserver）
   */
  function observePageChanges() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          // 重新添加图标
          addIconsToMenuItems();
          
          // 重新设置事件处理器
          setupGroupClickHandlers();
          setupPageClickHandlers();
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: false
    };

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      observer.observe(sidebar, config);
    }
  }

  /**
   * 埋点追踪 - 分组切换
   * @param {string} groupName - 分组名称
   * @param {boolean} isExpanded - 是否展开
   */
  function trackGroupToggle(groupName, isExpanded) {
    const eventData = {
      event: 'nav_group_toggle',
      group_name: groupName,
      action: isExpanded ? 'expand' : 'collapse',
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    // 如果有全局的埋点函数，则调用
    if (window.MintlifyTracking && window.MintlifyTracking.sendCustomEvent) {
      window.MintlifyTracking.sendCustomEvent(eventData);
    } else {
      console.log('[Navigation Track] Group Toggle:', eventData);
    }
  }

  /**
   * 埋点追踪 - 页面点击
   * @param {string} pageName - 页面名称
   */
  function trackPageClick(pageName) {
    const eventData = {
      event: 'nav_page_click',
      page_name: pageName,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    // 如果有全局的埋点函数，则调用
    if (window.MintlifyTracking && window.MintlifyTracking.sendCustomEvent) {
      window.MintlifyTracking.sendCustomEvent(eventData);
    } else {
      console.log('[Navigation Track] Page Click:', eventData);
    }
  }

  /**
   * 设置平滑滚动
   */
  function setupSmoothScroll() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }

  /**
   * 搜索功能（可选）
   */
  function setupSearch() {
    const searchInput = document.querySelector('.sidebar-search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      
      document.querySelectorAll('.sidebar-nav-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  /**
   * 响应式菜单按钮
   */
  function setupResponsiveMenu() {
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }

  /**
   * 暴露 API 给外部使用
   */
  window.MintlifyNav = {
    /**
     * 展开指定分组
     * @param {string} groupName - 分组名称
     */
    expandGroup: function(groupName) {
      document.querySelectorAll('.sidebar-nav-group-title').forEach(title => {
        if (title.textContent.includes(groupName)) {
          const group = title.closest('.sidebar-nav-group');
          group.classList.remove('collapsed');
          group.classList.add('expanded');
        }
      });
      saveNavState();
    },

    /**
     * 收起指定分组
     * @param {string} groupName - 分组名称
     */
    collapseGroup: function(groupName) {
      document.querySelectorAll('.sidebar-nav-group-title').forEach(title => {
        if (title.textContent.includes(groupName)) {
          const group = title.closest('.sidebar-nav-group');
          group.classList.remove('expanded');
          group.classList.add('collapsed');
        }
      });
      saveNavState();
    },

    /**
     * 全部展开
     */
    expandAll: function() {
      document.querySelectorAll('.sidebar-nav-group').forEach(group => {
        group.classList.remove('collapsed');
        group.classList.add('expanded');
      });
      saveNavState();
    },

    /**
     * 全部收起
     */
    collapseAll: function() {
      document.querySelectorAll('.sidebar-nav-group').forEach(group => {
        group.classList.remove('expanded');
        group.classList.add('collapsed');
      });
      saveNavState();
    },

    /**
     * 清除保存的状态
     */
    clearState: function() {
      localStorage.removeItem(CONFIG.storageKey);
    },

    /**
     * 获取当前状态
     */
    getState: function() {
      try {
        return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {};
      } catch (e) {
        return {};
      }
    }
  };

  /**
   * 页面加载完成后初始化
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  // 定期保存状态
  setInterval(saveNavState, 5000);
})();
