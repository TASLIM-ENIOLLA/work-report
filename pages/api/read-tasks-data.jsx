export default async function handler(_, res){
    const fs = require('fs')

    await fs.readFile('data/tasksdata.json', {encoding: 'utf-8'}, (err, data) => {
        if(err) res.status(200).json({
            type: 'error',
            data: err
        })
        else res.status(200).json({
            type: 'success',
            data: JSON.parse(data)
        })
    })
}
