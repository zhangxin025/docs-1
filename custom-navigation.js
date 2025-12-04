/**
 * Mintlify 自定义导航菜单脚本
 * 功能：
 * - 导航菜单交互增强
 * - 分组展开/收起状态保存
 * - 点击事件追踪
 * - 平滑滚动
 */

(function () {
  "use strict";
  const navItems = [
    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-green-400/20 dark:bg-green-400/20 text-green-700 dark:text-green-400">GET</span></span>',
      title: "RealTimeConcurrency",
    },
    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-green-400/20 dark:bg-green-400/20 text-green-700 dark:text-green-400">GET</span></span>',
      title: "RealTimeSessions",
    },
    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-green-400/20 dark:bg-green-400/20 text-green-700 dark:text-green-400">GET</span></span>',
      title: "CloseAllSessionsApp",
    },
    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-green-400/20 dark:bg-green-400/20 text-green-700 dark:text-green-400">GET</span></span>',
      title: "CloseSpecificSession",
    },
    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-green-400/20 dark:bg-green-400/20 text-green-700 dark:text-green-400">GET</span></span>',
      title: "GetConversationDetails",
    },
    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-[#3064E3] text-[#FFFFFF]">POST</span></span>',
      title: "CreateAvatar",
    },

    {
      doc: '<span class="method-nav-pill flex items-center w-8"><span class="px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold bg-green-400/20 dark:bg-green-400/20 text-green-700 dark:text-green-400">GET</span></span>',
      title: "QueryAvatar",
    },
  ];
  const linkUrlChangeList = [
    {
      title: "JavaScript SDK demo",
      url: "https://github.com/duixcom/duix-sdk-react-code-sample",
    },
  ];
  const CONFIG = {
    storageKey: "mintlify-nav-state",
    animationDuration: 300,
  };

  /**
   * 初始化导航菜单
   */
  function initNavigation() {
    // 添加图标到菜单项
    addIconsToMenuItems();

    // 为分组标题添加点击事件
    setupGroupClickHandlers();

    // 监听页面变化
    setupPageClickHandlerChange();
    linkUrlChange();

    // 监听路由变化
    setupRouteChangeListener();
  }

  /**
   * 为菜单项添加 home 图标
   */
  function addIconsToMenuItems() {
    // 为页面链接 li 项添加 home 图标
    document.querySelectorAll("#sidebar-group li").forEach((item) => {
      // 检查是否已经添加了图标
      if (!item.querySelector(".nav-item-icon")) {
        const link = item.querySelector("a");
        if (link) {
          // 创建图标元素
          const textContent = item.textContent;
          let doc = "";
          navItems.forEach((items) => {
            if (textContent.includes(items.title)) {
              doc = items.doc;
            }
          });
          // if (!doc) return;
          const icon = document.createElement("span");
          icon.className = "nav-item-icon";
          icon.innerHTML = doc;
          icon.style.opacity = "0.7";
          icon.style.transition = "opacity 0.2s ease";

          // 在链接的第一个子元素前插入图标
          const flexContainer = link.querySelector(".flex-1");
          if (flexContainer) {
            flexContainer.insertBefore(icon, flexContainer.firstChild);
          } else {
            link.insertBefore(icon, link.firstChild);
          }

          // 悬停时改变图标透明度
          item.addEventListener("mouseenter", function () {
            icon.style.opacity = "1";
          });

          item.addEventListener("mouseleave", function () {
            icon.style.opacity = "0.7";
          });
        }
      }
    });
  }

  /**
   *  自定义修改<a>的链接
   */
  function linkUrlChange() {
    linkUrlChangeList.forEach((item) => {
      const liElement = document.querySelector(
        `li[data-title="${item.title}"]`
      );
      if (liElement) {
        const aElement = liElement.querySelector("a");
        const textContent = aElement.textContent;
        if (aElement && textContent.includes(item.title)) {
          aElement.href = item.url;
          aElement.target = "_blank";
          aElement.rel = "noopener noreferrer";

          // 找到 <a> 标签下的第一个 <div>
          const firstDiv = aElement.querySelector("div");
          if (firstDiv) {
            // 检查是否已有 link 类，没有则加
            const existingLink = firstDiv.querySelector(".link");
            if (!existingLink) {
              const linkDiv = document.createElement("div");
              linkDiv.className = "link";
              linkDiv.style.display = "flex";
              linkDiv.style.alignItems = "center";
              linkDiv.style.marginLeft = "4px";
              
              const innerDiv = document.createElement("div");
              innerDiv.style.display = "flex";
              innerDiv.style.alignItems = "center";
              innerDiv.style.width = "10px";
              innerDiv.style.height = "10px";
              
              innerDiv.innerHTML =
                '<svg style="width: 100%; height: 100%; fill: currentColor;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M328 96c13.3 0 24 10.7 24 24V360c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9L73 409c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l231-231H88c-13.3 0-24-10.7-24-24s10.7-24 24-24H328z"></path></svg>';
              linkDiv.appendChild(innerDiv);
              // 插入到该 <div> 内部
              firstDiv.appendChild(linkDiv);
            }
          }
        }
      }
    });
  }

  /**
   * 保存导航状态
   */
  function saveNavState() {
    try {
      const state = {};

      document.querySelectorAll(".sidebar-nav-group").forEach((group) => {
        const title = group.querySelector(".sidebar-nav-group-title");
        if (title) {
          const groupName = title.textContent.trim();
          state[groupName] = group.classList.contains("expanded");
        }
      });

      localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn("[Navigation] Failed to save state:", e);
    }
  }

  /**
   * 设置分组点击事件
   */
  function setupGroupClickHandlers() {
    document.querySelectorAll(".sidebar-nav-group-title").forEach((title) => {
      title.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const group = this.closest(".sidebar-nav-group");
        if (!group) return;

        const isExpanded = group.classList.contains("expanded");

        if (isExpanded) {
          // 收起分组
          group.classList.remove("expanded");
          group.classList.add("collapsed");
        } else {
          // 展开分组
          group.classList.remove("collapsed");
          group.classList.add("expanded");
        }

        // 保存状态
        saveNavState();

        // 埋点追踪
        trackGroupToggle(this.textContent.trim(), !isExpanded);
      });
    });
  }

  /**
   * 监听页面变化
   */
  function setupPageClickHandlerChange() {
    const observer = new MutationObserver(function () {
      addIconsToMenuItems();
      linkUrlChange();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * 埋点追踪 - 分组切换
   * @param {string} groupName - 分组名称
   * @param {boolean} isExpanded - 是否展开
   */
  function trackGroupToggle(groupName, isExpanded) {
    const eventData = {
      event: "nav_group_toggle",
      group_name: groupName,
      action: isExpanded ? "expand" : "collapse",
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    // 如果有全局的埋点函数，则调用
    if (window.MintlifyTracking && window.MintlifyTracking.sendCustomEvent) {
      window.MintlifyTracking.sendCustomEvent(eventData);
    } else {
      console.log("[Navigation Track] Group Toggle:", eventData);
    }
  }

  /**
   * 埋点追踪 - 页面点击
   * @param {string} pageName - 页面名称
   */
  function trackPageClick(pageName) {
    const eventData = {
      event: "nav_page_click",
      page_name: pageName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    // 如果有全局的埋点函数，则调用
    if (window.MintlifyTracking && window.MintlifyTracking.sendCustomEvent) {
      window.MintlifyTracking.sendCustomEvent(eventData);
    } else {
      console.log("[Navigation Track] Page Click:", eventData);
    }
  }

  /**
   * 设置平滑滚动
   */
  function setupSmoothScroll() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (link && link.href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(link.hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    }
  }

  /**
   * 搜索功能（可选）
   */
  function setupSearch() {
    const searchInput = document.querySelector(".sidebar-search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase();

      document.querySelectorAll(".sidebar-nav-item").forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  /**
   * 响应式菜单按钮
   */
  function setupResponsiveMenu() {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("mobile-open");
      });
    }
  }

  /**
   * 监听路由变化
   */
  function setupRouteChangeListener() {
    let lastUrl = location.href;

    // 监听 popstate 事件（浏览器前进后退）
    window.addEventListener("popstate", function () {
      onRouteChange();
    });

    // 监听 hashchange 事件（hash 路由）
    window.addEventListener("hashchange", function () {
      onRouteChange();
    });

    // 使用 MutationObserver 监听 URL 变化（适配客户端路由）
    const observer = new MutationObserver(function () {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        onRouteChange();
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }

  /**
   * 路由变化处理函数
   */
  function onRouteChange() {
    const currentUrl = location.href;
    const currentPath = location.pathname;

    const eventData = {
      event: "route_change",
      url: currentUrl,
      path: currentPath,
      timestamp: new Date().toISOString(),
    };

    console.log("[Navigation] Route Changed:", eventData);

    // 如果有全局的埋点函数，则调用
    if (window.MintlifyTracking && window.MintlifyTracking.sendCustomEvent) {
      window.MintlifyTracking.sendCustomEvent(eventData);
    }

    // 重新应用 URL 映射
    linkUrlChange();
    addIconsToMenuItems();
  }

  /**
   * 暴露 API 给外部使用
   */
  window.MintlifyNav = {
    /**
     * 展开指定分组
     * @param {string} groupName - 分组名称
     */
    expandGroup: function (groupName) {
      document.querySelectorAll(".sidebar-nav-group-title").forEach((title) => {
        if (title.textContent.includes(groupName)) {
          const group = title.closest(".sidebar-nav-group");
          group.classList.remove("collapsed");
          group.classList.add("expanded");
        }
      });
      saveNavState();
    },

    /**
     * 收起指定分组
     * @param {string} groupName - 分组名称
     */
    collapseGroup: function (groupName) {
      document.querySelectorAll(".sidebar-nav-group-title").forEach((title) => {
        if (title.textContent.includes(groupName)) {
          const group = title.closest(".sidebar-nav-group");
          group.classList.remove("expanded");
          group.classList.add("collapsed");
        }
      });
      saveNavState();
    },

    /**
     * 全部展开
     */
    expandAll: function () {
      document.querySelectorAll(".sidebar-nav-group").forEach((group) => {
        group.classList.remove("collapsed");
        group.classList.add("expanded");
      });
      saveNavState();
    },

    /**
     * 全部收起
     */
    collapseAll: function () {
      document.querySelectorAll(".sidebar-nav-group").forEach((group) => {
        group.classList.remove("expanded");
        group.classList.add("collapsed");
      });
      saveNavState();
    },

    /**
     * 清除保存的状态
     */
    clearState: function () {
      localStorage.removeItem(CONFIG.storageKey);
    },

    /**
     * 获取当前状态
     */
    getState: function () {
      try {
        return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {};
      } catch (e) {
        return {};
      }
    },
  };

  /**
   * 页面加载完成后初始化
   */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation);
  } else {
    initNavigation();
  }

  // 定期保存状态
  setInterval(saveNavState, 5000);
})();
