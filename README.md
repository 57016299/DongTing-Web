# 动听音乐官网

这是一个纯静态的官方介绍页，已经补好了 PM2 启动方式，适合直接部署到 Ubuntu 服务器上。

## 本地预览

在项目目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## Ubuntu + PM2 部署

如果你的服务器本来就是 PM2 管理，推荐直接用这个方式。

1. 确认服务器已安装 Node.js 和 PM2

```bash
node -v
pm2 -v
```

2. 上传项目到服务器，例如：

```bash
mkdir -p /var/www/dongting-site
rsync -av --delete ./ /var/www/dongting-site/
cd /var/www/dongting-site
```

3. 用 PM2 启动：

```bash
pm2 start ecosystem.config.cjs
```

4. 设置开机自启：

```bash
pm2 save
pm2 startup
```

5. 常用命令：

```bash
pm2 status
pm2 logs dongting-site
pm2 restart dongting-site
pm2 stop dongting-site
```

默认端口是 `8080`。如果你要改端口，可以直接修改 [ecosystem.config.cjs](/Users/a1234/Documents/New%20project/ecosystem.config.cjs) 里的 `PORT`。

## PM2 + Nginx 反向代理

如果你希望继续用 PM2 跑站点，同时由 Nginx 对外暴露 80 或 443 端口，可以这样配：

1. 先按上面的 PM2 方式启动，确保站点监听在 `127.0.0.1:8080` 或 `0.0.0.0:8080`

2. 安装 Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

3. 新建反向代理配置：

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

4. 启用配置：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 仅静态托管的 Nginx 方案

1. 安装 Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

2. 上传项目文件到服务器，例如：

```bash
sudo mkdir -p /var/www/dongting-site
sudo rsync -av --delete ./ /var/www/dongting-site/
```

3. 新建站点配置：

```bash
sudo cp /var/www/dongting-site/nginx.conf /etc/nginx/sites-available/dongting-site.conf
```

4. 编辑 `/etc/nginx/sites-available/dongting-site.conf`，把下面两行改成服务器上的静态目录：

```nginx
root /var/www/dongting-site;
index index.html;
```

5. 启用站点：

```bash
sudo ln -sf /etc/nginx/sites-available/dongting-site.conf /etc/nginx/sites-enabled/dongting-site.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

这个方案会直接让 Nginx 读取静态文件，不经过 PM2。

## Docker 部署

构建镜像：

```bash
docker build -t dongting-site .
```

运行容器：

```bash
docker run -d --name dongting-site -p 80:80 dongting-site
```

## 后续可替换内容

- `index.html` 中下载按钮的 `href`
- 页面品牌文案
- `assets/screenshots/` 里的截图素材
- `assets/brand/logo.png` 品牌图标
- `ecosystem.config.cjs` 中的端口和进程名
