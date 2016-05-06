Templates will be loaded to store after the user selects a channel.

Banner preview is a <canvas> (not <img>) which is a duplicate of actual canvas.
By using canvas we can skip converting canvas to img which makes rendering preview faster.

img elements are stored in imagesByCountry so that loading to canvas is fast.
See the containing reducer modules for more information.