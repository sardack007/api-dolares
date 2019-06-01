const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'modulo4',
    host: '67.205.143.180',
    database: 'tcs2',
    password: 'modulo4',
    port: 5432,
});

module.exports = {
    getTodo: async (req, res) => {
        try{

            pool.query('SELECT fecha, importe FROM recaudaciones ' +
                'WHERE moneda = \'113\' ;')
                .then(response => {
                    console.log(response.rows);
                    res.send(response.rows);

                })
                .catch(err => {
                    console.log(err)
                })
        }catch (e) {
            throw new Error(e);
        }
    },
    getAnio: async (req, res) => {
        const anio = req.params.anio;
        console.log(anio);
        try{

            pool.query(`select fecha, importe from recaudaciones where moneda = '113' and date_part('year', fecha) = '${anio}'`)
              .then(response => {
                console.log(response.rows);
                  res.send(response.rows);
              })
              .catch(err => {
                console.log(err)
              })
        }catch (e) {
          throw new Error(e);
        }
    },
    getMes: async (req, res) => {
        const fecha = req.params.fecha.split('-');
        console.log(fecha);
        const anio = fecha[0];
        const mes = fecha[1];
        console.log(mes);
        try{

            pool.query(`select fecha, importe from recaudaciones
            where moneda = '113'
            and date_part('year', fecha) = '${anio}'
            and date_part('month', fecha) = '${mes}'`)
                .then(response => {
                    console.log(response.rows);
                    res.send(response.rows);

                })
                .catch(err => {
                    console.log(err)
                })
        }catch (e) {
            throw new Error(e);
        }
    },
    getDia: async (req, res) => {
        const fecha = req.params.fecha.split('-');
        console.log(fecha);
        const anio = fecha[0];
        const mes = fecha[1];
        const dia = fecha[2];
        console.log(mes);
        try{

            pool.query(`select fecha, importe from recaudaciones
            where moneda = '113'
            and date_part('year', fecha) = '${anio}'
            and date_part('month', fecha) = '${mes}'
            and date_part('day', fecha) = '${dia}'`)
                .then(response => {
                    console.log(response.rows);
                    res.send(response.rows);

                })
                .catch(err => {
                    console.log(err)
                })
        }catch (e) {
            throw new Error(e);
        }
    },
};

