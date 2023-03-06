export default async function handler(req, res){
    const fs = require('fs')
    const {query: {count}} = req

    await fs.readFile('data/tasksdata.json', {encoding: 'utf-8'}, (err, data) => {
        if(err) res.status(200).json({
            type: 'error',
            message: err
        })
        else{
            const result = JSON.parse(data)

            res.status(200).json({
                type: 'success',
                data: (
                    (count)
                    ? result.filter((_, index) => index < count)
                    : result
                )
            })
        }
    })
}
