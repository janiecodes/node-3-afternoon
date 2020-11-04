module.exports = {
    create:(req, res) => {  
        const db = req.app.get('db');

        const {name, description, price, image_url} = req.body

        db.create_product([name, description, price, image_url])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send("ERROR! CAN'T CREATE PRODUCT!")
                console.log(err)
            })
    },

    getOne:(req, res) => {
        const db = req.app.get('db');

        const {id} = req.params

        db.read_product(id)
            .then(product => {
                res.status(200).send(product)
            }).catch(err => {
                res.status(500).send("ERROR! CAN'T GET ONE PRODUCT");
                console.log(err)
            })
    },

    getAll:(req, res) => {
        const db = req.app.get('db');

        db.read_products()
            .then(products => {
                res.status(200).send(products)
            }).catch(err => {
                res.status(500).send("ERROR! CAN'T GET ALL PRODUCTS!")
                console.log(err)
            })
    },

    update:(req, res) => {
        const db = req.app.get('db');

        const {id} = req.params
        const {desc} = req.query

        db.update_product([id, desc])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send("ERROR! CAN'T UPDATE!")
                console.log(err)
            })

    },

    delete:(req, res) => {
        const db = req.app.get('db');

        const {id} = req.params

        db.delete_product(id)
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send("ERROR! CAN'T DELETE!")
                console.log(err)
            })
    }
}