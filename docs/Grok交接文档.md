# Grok Bot 交接文档：中烟国际集团网站新闻维护

> **用途**：本文件让任何一个新 AI 助手（Grok、Codex、Cursor 等）能独立完成"接收新闻材料 → 改代码 → 部署到演示/生产"的完整闭环，不需要额外问用户。
>
> **版本**：2026-10-27 基于 git `95e4360` 整理
>
> **读完本文档，你应该能回答**：下一条新闻 id 是几？该改哪些文件？怎么拿到服务器密码？部署脚本在哪个分支？部署失败了怎么回滚？

---

## 0. 5 秒速读区（必须先读）

| 项目 | 值 |
|---|---|
| Gitee 仓库 | https://gitee.com/yang-shuangyi/zhongyanzuixinban.git |
| 本地项目路径 | `<任意路径>/zhongyan/tobacco`（含 `node_modules`，可直接 `npm run dev`） |
| 本地 dev | `npm run dev`，端口 **10087**（不是默认 5173，见 vite.config.js） |
| 三个分支 | `develop` 本地开发 · `release` 演示环境 · `main` 生产环境 |
| 当前最新提交 | `95e4360`（main = release，三环境已统一） |
| 当前最大新闻 id | **28**，下一条用 **29** |
| 下一个 newsTitle | **newsTitle28**（当前最大是 newsTitle27） |
| 下一个 newsContent | **newsContent67**（当前最大是 newsContent66） |
| 服务器密码 | **不在本文档里明文写**。读取项目根目录 `中烟基本信息.txt`（已被 .gitignore 排除，Gitee 上没有） |
| 演示站地址 | http://180.76.235.116:5177 （端口 5177，服务器监听的不是 80） |
| 生产站地址 | http://103.107.88.249/ |

---

## 1. 项目结构

```
tobacco/
├── i18n/locales/
│   ├── zh-CN.json        # 简体中文（必须改）
│   ├── zh-TW.json        # 繁体中文（必须改）
│   └── en.json           # 英文版，新闻数据空的，不用改
├── src/views/
│   ├── newsDetail.vue    # 新闻详情页（必须改）
│   ├── news.vue          # 新闻列表页（不用改，自动读 newsList）
│   └── IndexView.vue     # 首页（新闻卡片从 newsListIndex 自动渲染，通常不用改）
├── src/assets/images/newsPic/   # 新闻配图存这里
├── deploy/               # 部署脚本在 Git 里的副本（参考用）
├── 年度更新记录.md       # 每次部署登记一条
├── 中烟基本信息.txt       # ⚠️ 服务器密码/Git 凭据在这里，.gitignore 排除，Gitee 上没有
└── docs/
    ├── Grok交接文档.md   # 你正在读的这个文件
    ├── 新增新闻标准流程.md # 旧版流程，本文档已包含其全部内容
    └── 环境与部署信息.md   # 旧版环境记录
```

**构建命令**：`npm run build`，产物输出到 `tobacco/` 子目录（见 vite.config.js 的 `outDir`）。

---

## 2. 新闻编号盘点方法（最重要，不要凭感觉写）

每次新增新闻前必须先跑这段 Python 脚本，**不要手算**：

```bash
cd /path/to/tobacco
python3 -c "
import json, re
d = json.load(open('i18n/locales/zh-CN.json', encoding='utf-8'))['message']
news_ids = [n['id'] for n in d['newsList']]
title_nums = [int(k[9:]) for k in d if k.startswith('newsTitle') and k[9:].isdigit()]
content_nums = [int(k[11:]) for k in d if k.startswith('newsContent') and k[11:].isdigit()]
print('最大 newsList id：', max(news_ids), '→ 下一条用', max(news_ids)+1)
print('最大 newsTitle 编号：', max(title_nums), '→ 下一个 newsTitle', max(title_nums)+1)
print('最大 newsContent 编号：', max(content_nums), '→ 正文从 newsContent', max(content_nums)+1, '开始，每段 +1')
print('newsListIndex 当前 3 条：', [(x['id'], x['date'], x['title'][:20]) for x in d['newsListIndex']])
"
```

**三条铁律**：
1. **newsListIndex 永远只有 3 条**——新增后整体替换为 `[新id, 旧1, 旧2]`，不能变成 4 条
2. **newsList 按日期倒序插入**，不是按 id 排序（历史上有补录 id 比新 id 大的情况）
3. **newsContent 编号不连续也没关系**——只要每条新闻的段号递增就行，不需要全局连续

---

## 3. 收到新闻材料后的完整 SOP

### Step 1：解析用户给的 Word

用户通常给 `.docx` 或 `.doc`，里面包含标题、日期、正文、图片。

**如果是 .docx**（推荐）：
```bash
textutil -convert txt news.docx -output news.txt
unzip -l news.docx          # 看 word/media/ 里有没有图片
unzip news.docx -d unz     # 解压出 word/media/*.png/jpg
```

**如果是 .doc**（textutil 转不了图片，必须用 Python 二进制提取）：
```bash
python3 -c "
import re, os
data = open('news.doc','rb').read()
os.makedirs('imgs', exist_ok=True)
i = 0
# JPEG
for m in re.finditer(b'\xff\xd8\xff', data):
    start = m.start(); end = data.find(b'\xff\xd9', start)
    if end != -1 and end - start > 5000:
        i += 1; open(f'imgs/img{i}.jpg','wb').write(data[start:end+2])
# PNG
for m in re.finditer(b'\x89PNG\r\n\x1a\n', data):
    start = m.start(); end = data.find(b'IEND\xaeB\x60\x82', start)
    if end != -1 and end - start > 5000:
        i += 1; open(f'imgs/img{i}.png','wb').write(data[start:end+8])
print('提取了', i, '张图片')
"
```

**图片处理**：把图片缩到最大 1800px 宽、JPEG 质量 85，命名 `YYYYMMDD.jpg`（同一天多张用 `_1`、`_2` 后缀），存到 `src/assets/images/newsPic/`。
```bash
sips -Z 1800 -s format jpeg -s formatOptions 85 原图.jpg --out src/assets/images/newsPic/20261021.jpg
```

**日期处理**：用户给的是"10月20日"这种无年份格式时，用文件标题里的日期（如"(10.21)"暗示 2026-10-21 发布）；不确定就问。统一格式 `YYYY-MM-DD`。

**正文分段**：Word 里有几个段落就分几个 `<div>`，一段对应一个 `newsContentN`。**严格按原文，不要润色、不要补写背景、不要自行删改**。

### Step 2：盘点编号（用上面的 Python 脚本）

得到下一个 news id、下一个 newsTitle 编号、newsContent 起始编号。

### Step 3：改 5 个位置

按下面顺序改，**三个 JSON 文件顺序不能乱**：

#### 3a. zh-CN.json（简体）

三处改动：

**位置 A**：`message.newsList` 数组最前面插入新条目（按日期倒序）：
```json
{
    "id": 29,
    "date": "YYYY-MM-DD",
    "title": "新闻标题（按原稿）",
    "desc": "摘要/正文第一段精简"
},
```

**位置 B**：`message.newsListIndex` 整体替换为新 3 条（**首页永远只保留 3 条**）：
```json
"newsListIndex": [
    { "id": 29, "date": "...", "title": "...", "content": "..." },
    { "id": 27, "date": "2026-07-30", "title": "...", "content": "..." },
    { "id": 26, "date": "2026-07-29", "title": "...", "content": "..." }
],
```

**位置 C**：文件末尾（其他 newsContent 之后）新增标题和正文：
```json
"newsTitle28": "新闻标题",
"newsContent67": "第一段正文",
"newsContent68": "第二段正文（如有）"
```

#### 3b. zh-TW.json（繁体）

与简体完全相同的改动，**所有中文转换为繁体**（引号「」、数字不变、标点不变）。
如果机器装了 `opencc`（Mac 上常见）：
```bash
python3 -c "
import opencc
c = opencc.OpenCC('s2tw')
print(c.convert('简体文本'))
"
```
没有 opencc 就手动翻，重点是**不要漏段、不要漏引号**。

#### 3c. newsDetail.vue（详情页）

改三处：

**位置 A**（标题）：在最后一个 `v-else-if` 之后加新分支：
```html
<template v-else-if="id == 29">
    {{ $t('message.newsTitle28') }}
</template>
```

**位置 B**（日期）：在最后一个日期模板之后加：
```html
<template v-else-if="id == 29">YYYY-MM-DD</template>
```

**位置 C**（正文+图片）：在最后一个 `<div v-if="id == N">` 之后加完整的详情块：
```html
<div v-if="id == 29">
    <div class="newspic">
        <img src="../assets/images/newsPic/YYYYMMDD.jpg"
            alt="新闻标题"
            oncontextmenu="return false" style="cursor:pointer;"
            @dblclick="openLowRes($event.target.src, 900)">
    </div>
    <div class="detailContent"
        :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
        <div>{{ $t('message.newsContent67') }}</div>
        <div>{{ $t('message.newsContent68') }}</div>
    </div>
</div>
```

#### 3d. 图片文件

`cp` 到 `src/assets/images/newsPic/YYYYMMDD.jpg`，**已压缩到 1800px 宽 + JPEG 85 质量**。

#### 3e. 年度更新记录.md（可选但推荐）

在表格最后加一行：
```md
| YYYY-MM-DD | 新闻发布 | 标题 + 简述 | 提交号 | 部署状态 |
```

### Step 4：本地验证

```bash
npm run dev   # 端口 10087
```

必须手动打开四个地址检查：
- http://localhost:10087/ 首页（新闻卡片是否 3 条、新新闻在第一条、有摘要）
- http://localhost:10087/news 列表页（首条日期对不对）
- http://localhost:10087/newsDetail/29 详情页（标题、日期、图片、正文）
- 切换繁体后再看一遍详情页

**也要跑**：`npm run build`（确保没有语法错误）

### Step 5：Git 提交

一个新闻一个提交，粒度细一点：
```bash
git add i18n/locales/zh-CN.json i18n/locales/zh-TW.json src/views/newsDetail.vue src/assets/images/newsPic/YYYYMMDD.jpg 年度更新记录.md
git commit -m "feat(新闻): 新增<标题摘要>(id <N>)"
```

---

## 4. 部署环境凭据

⚠️ **不要把密码抄写到任何 Git 里的文档里**。下面只给路径，真正的密码在本地项目根目录 `中烟基本信息.txt`（已被 .gitignore 排除，Gitee 上没有）。Grok 运行时直接 `open` 那个文件读就行。

| 环境 | 用途 | SSH 账号 | 密码来源 | 服务器 IP | 部署分支 |
|---|---|---|---|---|---|
| 本地开发 | 给用户预览 | — | — | — | `develop` |
| 演示环境 | 客户确认 | `root` | `中烟基本信息.txt` | `180.76.235.116` | `release` |
| 生产环境 | 正式线上 | `sunhuijun` | `中烟基本信息.txt` | `103.107.88.249` | `main` |

Gitee 仓库：`https://gitee.com/yang-shuangyi/zhongyanzuixinban.git`（本地已经配置 `gitee` remote）

## 5. 部署方法

### 5.1 部署到演示环境

演示服务器部署脚本会自动 `git pull release → npm install → npm run build → 备份 → 部署`。所以**你只需要把代码推到 Gitee release 分支**，然后在服务器上跑脚本。

```bash
# 1. 在本地把代码推到 release
git checkout release
git merge main        # 或者 cherry-pick 具体提交
git push gitee release

# 2. 登录演示服务器（密码在 中烟基本信息.txt）
ssh root@180.76.235.116

# 3. 跑部署脚本（一条命令，自动完成全部）
cd /home/demo/tobacco/publish_script && bash full_deploy.sh
```

**⚠️ 第一次跑可能会失败**：如果服务器源码目录有脏工作区（之前手工 SCP 过文件），git 会拒绝 pull。解决方案：
```bash
# 在服务器上执行一次清理
cd /home/demo/sourcecode/tobacco
git checkout -- .
git clean -fd
# 然后重新跑 full_deploy.sh
```

### 5.2 部署到生产环境

**绝对不要把 release 整包合并到 main**。生产只 cherry-pick 明确要上线的提交。

```bash
# 1. 在本地确保 main 是最新的
git fetch gitee
git checkout main
git merge --ff-only gitee/main

# 2. 把这条新闻的提交挑进来（commit-hash 就是你刚才的 git commit）
git cherry-pick <commit-hash>

# 3. 检查 diff，确认只有新闻相关文件
git diff --stat gitee/main~1..HEAD
# 应该只有 5 个文件：zh-CN.json / zh-TW.json / newsDetail.vue / 新图片 / 年度更新记录.md
# 如果出现 carousel-toggle、back-to-top 之类的关键词，说明误带了演示功能，立刻 git reset --hard gitee/main

# 4. 推到 Gitee main
git push gitee HEAD:main

# 5. 登录生产服务器
ssh sunhuijun@103.107.88.249

# 6. 跑部署脚本
cd /home/sunhuijun/tobacco/publish_script && bash full_deploy.sh
```

### 5.3 部署后的验证清单

演示和生产各查一次：

| 检查项 | 方法 |
|---|---|
| 首页新闻卡片 3 条 | 打开首页，数一下卡片数量，看标题是不是新的在第一条 |
| 首页日期 | 新闻卡片日期倒序 |
| 详情页打开 | `/newsDetail/<id>` 404 了说明 newsDetail.vue 没改 |
| 详情页图片 | `document.querySelector('.newspic img').naturalWidth > 0` |
| 详情页正文 | 两段都在，没有被截断 |
| 繁体同样正常 | 切换繁体后标题和正文都转成「」引号 |
| 构建产物含新图 | `ls tobacco/assets/jpg/ | grep YYYYMMDD` |

演示站：http://180.76.235.116:5177/newsDetail/29
生产站：http://103.107.88.249/newsDetail/29

---

## 6. 回滚（部署出问题时用）

两个服务器的部署脚本都会自动把旧版本备份到：
- 演示：`/usr/share/nginx/html/backups/tobacco_demo_YYYYMMDDHHMMSS`
- 生产：`/usr/share/nginx/html/backups/tobacco_YYYYMMDDHHMMSS`

回滚命令：
```bash
# 演示
rm -rf /usr/share/nginx/html/tobacco/*
cp -a /usr/share/nginx/html/backups/tobacco_demo_<时间戳>/. /usr/share/nginx/html/tobacco/

# 生产
rm -rf /usr/share/nginx/html/tobacco/*
cp -a /usr/share/nginx/html/backups/tobacco_<时间戳>/. /usr/share/nginx/html/tobacco/
```

代码回滚（推了错误提交到 main）：
```bash
git checkout main
git revert <bad-commit-hash>
git push gitee HEAD:main
```

---

## 7. 常见坑（实际踩过的）

| 坑 | 症状 | 正确做法 |
|---|---|---|
| **演示服务器脏工作区** | `full_deploy.sh` 报 "Your local changes would be overwritten by checkout" | 在服务器源码目录 `git checkout -- . && git clean -fd` 后重跑 |
| **演示服务器 nginx 监听 5177** | `curl localhost:80` 返回 000，但 `curl localhost:5177` 返回 200 | 演示站 URL 必须带端口；生产站是 80 不带端口 |
| **docx 图片 textutil 提取不出来** | Mac textutil 能转文字，但 .doc 的图片必须二进制 carving | 用本文档 Step 1 的 Python 脚本 |
| **首页新闻卡片本身没有图片** | 误以为首页缩略图破了，其实代码里 IndexView.vue 的 news-item 只有标题+摘要+日期 | 首页卡片设计就没图，别去修这个；图片只在详情页 |
| **详情页控制台报 "获取新闻详情失败"** | `Cannot read properties of undefined (reading 'noticeContent')` | 正常现象——本地/生产都没有后端 `/api/portal/banner/*`，接口返回 index.html；正文由本地 i18n 静态渲染，用户无感知 |
| **年度更新记录.md 有两份** | tobacco/ 和 tobacco-local-notes/ 各有一份 | 只改 tobacco/docs/ 下的这一份；tobacco-local-notes 是用户自己的笔记副本，不同步没关系 |
| **zh-CN 和 zh-TW JSON 里 `newsListIndex` 被替换成 4 条** | 首页多了一条新闻 | 替换时要数清楚：**永远只写 3 条** |
| **日期只写了"6月11日"没年份** | 部署后列表排序错乱 | 先问用户，或看文件标题里的年份（如文件名含 "10.21" → 2026-10-21） |
| **标题超过 25 字导致首页截断难看** | 首页卡片标题被省略号截断 | 尽量控制在 20-25 字；人名/奖项/地点/数字必须保留，只删"隆重""圆满"等修饰词 |

---

## 8. 端到端示例（你可以照着跑一遍来验证自己）

假设用户给了一份《2026-10-27 年度工作会议》docx 新闻稿：

```bash
# 1. 找项目
cd ~/Downloads/项目开发/zhongyan/tobacco

# 2. 盘点编号（假设脚本输出：下一个 id=29，newsTitle=28，newsContent=67）
python3 docs/盘点编号脚本.py   # 如果把上面的 Python 存成脚本的话

# 3. 把 docx 里的图片解压出来
unzip /path/to/news.docx -d /tmp/news_extracted
cp /tmp/news_extracted/word/media/image1.png src/assets/images/newsPic/20261027.png

# 4. 改三个文件（zh-CN.json / zh-TW.json / newsDetail.vue），改完跑本地
npm run dev
# 打开 localhost:10087 看首页、列表、详情页，确认 OK

# 5. 提交
git add -A && git commit -m "feat(新闻): 新增2026年度工作会议新闻(id 29)"

# 6. 推到 release + 演示部署
git checkout release && git merge main && git push gitee release
ssh root@180.76.235.116 "cd /home/demo/tobacco/publish_script && bash full_deploy.sh"
# 浏览器打开 http://180.76.235.116:5177/newsDetail/29 确认

# 7. 用户说"可以了，上生产"
git checkout main && git cherry-pick <刚才的commit-hash> && git push gitee HEAD:main
ssh sunhuijun@103.107.88.249 "cd /home/sunhuijun/tobacco/publish_script && bash full_deploy.sh"
# 浏览器打开 http://103.107.88.249/newsDetail/29 确认
```

---

## 9. 三个环境版本一致性校验（部署后跑）

```bash
# 本地
git log --oneline -1

# 演示服务器
ssh root@180.76.235.116 "cd /home/demo/sourcecode/tobacco && git log --oneline -1"

# 生产服务器
ssh sunhuijun@103.107.88.249 "cd /home/sunhuijun/sourcecode/tobacco && git log --oneline -1"
```

三个输出的 commit hash 应该一样。如果不一样，某个环境没跟上，重新跑对应的 `full_deploy.sh`。

---

## 10. 分支策略总结（别搞混）

```
develop  ──→ 本地开发，Git 不要求有 develop 分支，本地 master 即可
              │
              ▼ 合并到 release（当用户说"部署演示"）
release  ──→ 演示环境（固定拉 origin/release）
              │
              ▼ cherry-pick 到 main（用户说"上生产"）
main     ──→ 生产环境（固定拉 origin/main，不能带演示功能）
```

**核心原则**：main 永远等于生产真实版本。不要整包 release→main，只 cherry-pick 明确的提交。release 可以比 main 新，用来演示但不会自动进生产。

---

## 11. 月度访问统计（不是新闻更新，但也是维护活）

每月 2 号自动生成上月网站访问统计报告，是独立脚本，和 Vue 项目无关。
详情见项目根目录 `中烟基本信息.txt` 底部。Grok 第一次接手先看看那份文件，里面有脚本路径和参数。

---

**本文档结束。读完你应该能独立完成从 docx 到生产部署的全部步骤。有疑问先查：docs/新增新闻标准流程.md、docs/环境与部署信息.md、中烟基本信息.txt。**
