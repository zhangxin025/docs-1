---
title: Google Analytics 集成指南
description: 在 Mintlify 中集成 Google Analytics (GA4) 追踪
---

## 概述

本指南说明如何在 Mintlify 文档中集成 Google Analytics (GA4) 来追踪用户行为。

---

## 方式1：使用 mint.json 配置（推荐）✅

### 配置步骤

在 `mint.json` 中添加以下配置：

```json
{
  "analytics": {
    "gtm": "G-XKHVFX7R8L"
  }
}
```

**完整示例：**

```json
{
  "$schema": "https://mintlify.com/schema.json",
  "name": "DUIX API 文档",
  "logo": {
    "dark": "/logo/dark-logo.svg",
    "light": "/logo/light-logo.svg"
  },
  "colors": {
    "primary": "#934EEF"
  },
  "analytics": {
    "gtm": "G-XKHVFX7R8L"
  },
  "css": "/custom-navigation.css",
  "js": "/custom-navigation.js"
}
```

### 支持的分析工具

| 工具 | 配置字段 | 值示例 |
|------|--------|---------|
| Google Analytics | `gtm` | `G-XKHVFX7R8L` |
| Segment | `segment` | `write_key` |
| Posthog | `posthog` | `api_key` |
| Mixpanel | `mixpanel` | `token` |

---

## 方式2：使用自定义脚本

### 创建 GA 脚本文件

**文件：** `public/google-analytics.js`

```javascript
/**
 * Google Analytics (GA4) 初始化脚本
 */

(function() {
  // 异步加载 GA 脚本
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XKHVFX7R8L';
  document.head.appendChild(script);

  // 初始化数据层
  window.dataLayer = window.dataLayer || [];
  
  function gtag(){
    dataLayer.push(arguments);
  }
  
  gtag('js', new Date());
  gtag('config', 'G-XKHVFX7R8L');

  /**
   * 自定义追踪事件
   */
  window.MintlifyGA = {
    // 追踪页面浏览
    trackPageView: function(pagePath, pageTitle) {
      gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title
      });
    },

    // 追踪自定义事件
    trackEvent: function(eventName, eventData) {
      gtag('event', eventName, eventData || {});
    },

    // 追踪导航点击
    trackNavigation: function(navItem, navType) {
      gtag('event', 'navigation_click', {
        nav_item: navItem,
        nav_type: navType
      });
    },

    // 追踪按钮点击
    trackButtonClick: function(buttonName, buttonLabel) {
      gtag('event', 'button_click', {
        button_name: buttonName,
        button_label: buttonLabel
      });
    },

    // 追踪代码复制
    trackCodeCopy: function(codeType) {
      gtag('event', 'code_copy', {
        code_type: codeType
      });
    },

    // 追踪搜索
    trackSearch: function(searchTerm) {
      gtag('event', 'search', {
        search_term: searchTerm
      });
    },

    // 追踪文档下载
    trackDownload: function(fileName, fileType) {
      gtag('event', 'file_download', {
        file_name: fileName,
        file_type: fileType
      });
    },

    // 追踪外链点击
    trackExternalLink: function(url, linkText) {
      gtag('event', 'external_link_click', {
        url: url,
        link_text: linkText
      });
    }
  };
})();
```

### 在 mint.json 中加载脚本

```json
{
  "js": [
    "/custom-navigation.js",
    "/google-analytics.js"
  ]
}
```

---

## 方式3：在 HTML 中直接添加（备选）

### 创建 `_document.jsx` 或 `_head.jsx`

如果 Mintlify 支持自定义文档，可以创建 `pages/_document.jsx`：

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XKHVFX7R8L"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XKHVFX7R8L');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

---

## 集成自定义埋点追踪

### 1. 导航菜单点击追踪

修改 `custom-navigation.js`：

```javascript
// 埋点追踪 - 分组切换
function trackGroupToggle(groupName, isExpanded) {
  if (window.MintlifyGA) {
    window.MintlifyGA.trackNavigation(groupName, isExpanded ? 'expand' : 'collapse');
  }
}

// 埋点追踪 - 页面点击
function trackPageClick(pageName) {
  if (window.MintlifyGA) {
    window.MintlifyGA.trackNavigation(pageName, 'page_click');
  }
}
```

### 2. 代码块复制追踪

```javascript
// 监听代码复制事件
document.addEventListener('copy', function(e) {
  const codeBlock = e.target.closest('pre');
  if (codeBlock && window.MintlifyGA) {
    window.MintlifyGA.trackCodeCopy(codeBlock.className || 'code');
  }
});
```

### 3. 外链点击追踪

```javascript
// 监听外链点击
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function() {
    if (window.MintlifyGA) {
      window.MintlifyGA.trackExternalLink(this.href, this.textContent);
    }
  });
});
```

---

## 在 Google Analytics 中验证

### 查看实时数据

1. 登录 [Google Analytics](https://analytics.google.com)
2. 选择你的属性
3. 进入 **实时** → **概览**
4. 打开你的文档站点
5. 应该能看到实时用户和事件

### 创建自定义事件报告

1. 进入 **报告** → **事件** → **所有事件**
2. 查看 `navigation_click`、`page_view` 等事件
3. 可以按事件名称、参数等进行过滤

### 创建仪表板

```
事件名称 | 用户数 | 事件数 | 参数
--------|-------|-------|-------
page_view | 123 | 456 | page_title
navigation_click | 45 | 89 | nav_item
code_copy | 12 | 34 | code_type
```

---

## 当前项目配置

### mint.json 已配置

```json
{
  "analytics": {
    "gtm": "G-XKHVFX7R8L"
  }
}
```

### 自定义脚本已创建

- `custom-navigation.js` - 导航追踪
- `custom-navigation.css` - 导航样式
- `ga-config.html` - GA 配置参考

---

## 事件追踪清单

| 事件 | 触发条件 | 参数 |
|------|--------|------|
| `page_view` | 页面加载 | page_path, page_title |
| `navigation_click` | 点击导航项 | nav_item, nav_type |
| `button_click` | 点击按钮 | button_name, button_label |
| `code_copy` | 复制代码 | code_type |
| `search` | 搜索 | search_term |
| `file_download` | 下载文件 | file_name, file_type |
| `external_link_click` | 点击外链 | url, link_text |

---

## 常见问题

<AccordionGroup>
  <Accordion title="如何验证 GA 是否正确加载？">
    1. 打开浏览器开发者工具
    2. 进入 **Console** 选项卡
    3. 输入 `gtag` 检查是否存在
    4. 或在 **Network** 选项卡搜索 `gtag` 请求
  </Accordion>
  
  <Accordion title="如何追踪自定义事件？">
    使用暴露的 API：
    ```javascript
    window.MintlifyGA.trackEvent('event_name', {
      param1: 'value1',
      param2: 'value2'
    });
    ```
  </Accordion>
  
  <Accordion title="如何排除内部流量？">
    在 GA 中创建内部流量过滤器：
    1. 进入 **管理** → **数据过滤**
    2. 创建过滤器排除你的 IP
  </Accordion>
  
  <Accordion title="GA4 和 Universal Analytics 的区别？">
    - GA4 使用 `G-` 开头的 ID
    - Universal Analytics 使用 `UA-` 开头的 ID
    - GA4 提供更强大的分析功能
  </Accordion>
  
  <Accordion title="多少时间后才能看到数据？">
    - 实时数据：几秒钟内显示
    - 报告数据：通常延迟 24-48 小时
  </Accordion>
</AccordionGroup>

---

## 最佳实践

✅ **推荐做法：**
1. 使用 `gtm` 配置简化设置
2. 追踪关键用户行为（导航、搜索、下载）
3. 定期查看报告，优化文档结构
4. 创建自定义仪表板监控关键指标
5. 排除内部流量，确保数据准确

❌ **避免做法：**
1. 追踪过于详细的数据（会增加成本）
2. 忘记排除内部流量
3. 在 GA 中存储敏感信息
4. 重复加载 GA 脚本

---

## 官方参考

- [Google Analytics 文档](https://support.google.com/analytics)
- [GA4 设置指南](https://support.google.com/analytics/answer/10089681)
- [Mintlify Analytics](https://mintlify.com/docs/settings/analytics)
- [gtag.js 文档](https://developers.google.com/analytics/devguides/collection/gtagjs)

---

## 总结

| 方式 | 难度 | 配置 | 推荐度 |
|------|------|------|--------|
| mint.json GTM | 低 | 1 行 | ⭐⭐⭐⭐⭐ |
| 自定义脚本 | 中 | 文件 | ⭐⭐⭐⭐ |
| HTML 直接添加 | 中 | 代码片段 | ⭐⭐⭐ |

**最佳实践：** 使用 `mint.json` 的 GTM 配置 + 自定义脚本的埋点追踪！
