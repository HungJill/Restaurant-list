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
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  console.log(req.query)
  const keyword = req.query.keyword.trim()
  const searchType = req.query.searchType
  const restaurants = restaurantList.results.filter(restaurants => {
    if (searchType === 'name') {
      return restaurants.name.toLowerCase().includes(keyword.toLowerCase())
    } else if (searchType === 'category') {
      return restaurants.category.toLowerCase().includes(keyword.toLowerCase())
    } else if (searchType === 'location') {
      return restaurants.location.toLowerCase().includes(keyword.toLowerCase())
    }

  })

  res.render('index', { restaurants: restaurants, keyword: keyword, searchType: searchType })
})
app.listen(port, () => {
  console.log(`The express is running on http://localhost:${port}`)
})