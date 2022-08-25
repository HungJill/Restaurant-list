const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//routes setting
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurants.category.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})
app.listen(port, () => {
  console.log(`The express is running on http://localhost:${port}`)
})