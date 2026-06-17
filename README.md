# 安徽制霸生成器

基于 [china-ex-ns](https://github.com/qianphong/china-ex-ns) 的安徽省版本，标记你在安徽 16 个地级市的探索足迹，生成你的"安徽制霸"地图。

## 使用方法

点击地图上的城市，选择对应的探索等级：

| 等级 | 含义 | 分数 |
|------|------|------|
| 没去过 | 从未踏足 | 0 |
| 路过 | 途经未停留 | 1 |
| 出差 | 因公到访 | 2 |
| 游玩 | 旅游观光 | 3 |
| 短居 | 短期居住 | 4 |
| 居住 | 长期居住 | 5 |

点击右上角下载按钮可导出 PNG 图片。

## 安徽省 16 个地级市

合肥市、芜湖市、蚌埠市、淮南市、马鞍山市、淮北市、铜陵市、安庆市、黄山市、滁州市、阜阳市、宿州市、六安市、亳州市、池州市、宣城市

## 技术栈

- Vue 3 + TypeScript
- Vite
- ECharts 5 + vue-echarts
- UnoCSS
- 地图数据：阿里云 DataV GeoJSON
- 字体：Noto Serif SC（思源宋体）

## 本地开发

```bash
pnpm install
pnpm dev
```

## 致谢

原项目 [china-ex-ns](https://github.com/qianphong/china-ex-ns) 作者 [@qianphong](https://github.com/qianphong)。

## License

MIT
