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
        try {

            pool.query('SELECT to_char("fecha", \'YYYY-MM-DD\') as fecha, importe FROM recaudaciones ' +
                'WHERE moneda = \'113\' order by fecha;')
                .then(response => {
                    console.log(response.rows);
                    res.send(response.rows);

                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            throw new Error(e);
        }
    },
    getAnio: async (req, res) => {
        const anio = req.params.anio;
        console.log(anio);
        try {

            pool.query(`select to_char("fecha", 'YYYY-MM-DD') as fecha, importe from recaudaciones  
                where moneda = '113' and date_part('year', fecha) = '${anio}' order by fecha`)
                .then(response => {
                    console.log(response.rows);
                    res.send(response.rows);
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            throw new Error(e);
        }
    },
    getMes: async (req, res) => {
        const fecha = req.params.fecha.split('-');
        console.log(fecha);
        const anio = fecha[0];
        const mes = fecha[1];
        console.log(mes);
        try {

            pool.query(`select to_char("fecha", 'YYYY-MM-DD') as fecha, importe from recaudaciones
            where moneda = '113'
            and date_part('year', fecha) = '${anio}'
            and date_part('month', fecha) = '${mes}' order by fecha`)
                .then(response => {
                    console.log(response.rows);
                    res.send(response.rows);

                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
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
        try {

            pool.query(`select to_char("fecha", 'YYYY-MM-DD') as fecha, importe from recaudaciones
            where moneda = '113'
            and date_part('year', fecha) = '${anio}'
            and date_part('month', fecha) = '${mes}'
            and date_part('day', fecha) = '${dia}' order by fecha`)
                .then(response => {
                    console.log(response.rows);
                    res.status(200).send(response.rows);

                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            throw new Error(e);
        }
    },
    getFechaImporteDolares: async (req, res) => {
        try {
            pool.query(`SELECT DISTINCT to_char("fecha", 'YYYY-MM-DD') as fecha FROM recaudaciones r
                WHERE r.moneda = '113' 
                AND r.fecha NOT IN (SELECT fecha FROM tipo_cambio) 
                order by fecha`)
                .then(response => {
                    res.status(200).send(response.rows);
                })
                .catch(err => {
                    console.log(err);
                })
        }catch (e) {
            throw new Error(e);
        }
    }
};

