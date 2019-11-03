const LivroDAO = require('../../app/infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) =>{
    app.get('/', function(req, resp){
        resp.send(
            `   
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body> 
                </html>
            `
        );
    });

    app.get('/livros', function(req, resp){

        const livroDAO = new LivroDAO(db);
        livroDAO.lista()
                    .then(livros => resp.marko(
                        require('../views/livros/lista/lista.marko'), {
                            livros: livros
                        }
                    ))
                    .catch(erro => console.log(erro));

        // livroDAO.lista(function(erro, resultados){

        //     resp.marko(
        //         require('../views/livros/lista/lista.marko'), {
        //             livros: resultados
        //         }
        //     );

        // // db.all('SELECT * FROM livros', function(erro, resultados){
        // //     resp.marko(
        // //         require('../views/livros/lista/lista.marko'), {
        // //             livros: resultados
        // //         }
        // //     );
        // // });

        
        // });
    }
    )

    app.get('/livros/form', function(req, resp){
        resp.marko(require('../views/livros/form/form.marko'), {livro:{}});
    })

    app.post('/livros', function(req, resp){
        console.log(req.body);        
        const livroDAO = new LivroDAO(db);
        
        livroDAO.adiciona(req.body)
                    .then(resp.redirect('/livros'))
                    .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, resp){
        console.log(req.body);        
        const livroDAO = new LivroDAO(db);
        
        livroDAO.atualiza(req.body)
                    .then(resp.redirect('/livros'))
                    .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp){
        const id = req.params.id;
        const livroDAO = new livroDAO(db);
        livroDAO.remove(id)
                    .then(()=> resp.status(200).end())
                    .catch(erro => console.log(erro));
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDAO = new LivroDAO(db);
    
        livroDAO.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });
};