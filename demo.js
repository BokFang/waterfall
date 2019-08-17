var waterfall = document.getElementById('waterfall')
var imgs = []
for(var i = 0; i <= 30; i++){
  imgs.push('imgs/' + i + '.jpg')
}
createWaterfall(waterfall,imgs,300)
/**
 * 创建一个瀑布流
 * @param {*} warpper 容器
 * @param {*} urls 图片的url地址数组
 * @param {*} width 图片宽度
 */
function createWaterfall(warpper,urls,width){
  var column
  var restSpace
  var perSpace
  createImgDoms()
  setImgPosition()
  //函数区
  var timer = null
  window.onresize = function(){
    if (timer){
      clearInterval(timer)
    }
    timer = setTimeout(function(){
      setImgPosition()
    },500)
  }
  function createImgDoms(){
    for(var i = 0; i < urls.length; i++){
      var url = urls[i]
      var img = document.createElement('img')
      img.src = url
      img.style.width = width + 'px' 
      img.style.position = 'absolute'
      warpper.appendChild(img)
      img.onload = function(){
        setImgPosition()
      }
    }
  }
  function calculater(){
    column = Math.floor(warpper.clientWidth / width)//列数
    restSpace = warpper.clientWidth - (column * width)//剩余间隔之和
    perSpace = restSpace / (column + 1)//每个间隔
  }
  function setImgPosition(){
    calculater()
    var columnY = new Array(column)
    columnY.fill(0)
    for(var i = 0; i < warpper.children.length; i++){
      var img = warpper.children[i]
      var y = Math.min(...columnY)//Y坐标
      var rankOfColumn = columnY.indexOf(y)//第几列
      var x = ((rankOfColumn + 1) * perSpace) + (rankOfColumn * width)
      img.style.left = x + 'px'
      img.style.top = y + 'px'
      columnY[rankOfColumn] += parseInt(img.height) +perSpace
    }
    
  }
}
