Templates will be loaded to store after the user selects a channel.

Banner preview is a <canvas> (not <img>) which is a duplicate of actual canvas.
By using canvas we can skip converting canvas to img which makes rendering preview faster.

img elements are stored in imagesByCountry so that loading to canvas is fast.
See the containing reducer modules for more information.

Banners visibility are based on pageNum. For example, if banner 1 is selected in page 1,
we want the banner to be shown in page 2. And also if banner 2 is not selected in page 1,
we don't want to show it in page 2. However when the user moves from page 2 to page 1,
we want to show banner 1 AND banner 2 in page 1. Banners are filtered in renderBannerListBySize()
in banner/results.jsx.
