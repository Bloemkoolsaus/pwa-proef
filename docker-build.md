### create an image

`docker build -t angular-node-image .`

### running on Image
`docker run -it -p  3080:3080 --name ang-node-ui angular-node-image`
