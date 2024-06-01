<!-- Backend deploy link -->

https://watch-e-commerce-be.onrender.com

<!-- User Routes -->

signup - /users/register
login - /users/login
logout - /users/logout
getuserById - /users/:id - GET
updateuserById - /users/:id - PUT
deleteuserById - /users/:id - DELETE
get All Users - /users/allUsers

<!-- Admin Routes -->

signup - /admins/register
login - /admins/login
logout - /admins/logout
getuserById - /admins/:id - GET
updateuserById - /admins/:id - PUT
deleteuserById - /admins/:id - DELETE
get All admins - /admins/allAdmins

<!-- Product (Watch) Routes -->

create product - /products/create
get All products - /products/getAllproducts
get by Id - /products/:id - GET
update by Id - /products/:id - PUT
delete by Id - /products/:id - DELETE
get products by collection - /products/collection/:collectionName

<!-- Accessories Routes -->

get list of category - /accessories/getList
get single product by Id from each category - /accessories/:id
get all products list from a category - /accessories/category/:name

<!-- Accessories category Routes -->

---category names---
1.natoStrap
2.twopiecestrap
3.fineleather
4.belts
5.bracelet
6.cufflink
7.sunglasses
8.keyholder (and others)

------ common routes for all category ------

create accessory - /Accessories/"categoryname"/create
update accessory - /Accessories/"categoryname"/:id - PUT
delete accessory - /Accessories/"categoryname"/:id - DELETE
get all accessories from category - /Accessories/"categoryname"/getAllProducts

<!-- Orders Routes -->

create order - /orders/createOrder - POST
order success - /orders/success - POST
search order - /orders/search/:id - GET
