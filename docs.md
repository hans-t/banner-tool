Templates will be loaded to store after the user selects a channel.

Banner preview is a <canvas> (not <img>) which is a duplicate of actual canvas.
By using canvas we can have faster drawImage, because drawing image using dataURI is slow.