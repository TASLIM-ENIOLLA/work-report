export default async function handler(req, res){
    const fs = require('fs');
    const {body} = req

    if(req.method === 'POST'){
        if(isJSON(body)){
            const {date, remark, event, troubleshoot} = JSON.parse(body)

            if(![date, remark, event].includes('')){
                const file_data = fs.readFileSync('data/tasksdata.json', 'utf8')
                const decoded_data = isJSON(file_data) ? JSON.parse(file_data) : []
                const updated_data = [{date, remark, event, troubleshoot}, ...decoded_data]

                await fs.writeFile('data/tasksdata.json', JSON.stringify(updated_data), (err) => {
                    if(err) res.status(200).json({
                        type: 'error',
                        message: err
                    })
                    else res.status(200).json({
                        type: 'success',
                        message: 'Information saved successfully.',
                        data: {date, remark, event, troubleshoot}
                    })
                })

            }
            else{
                console.log('\u0007')

                if(new Date(date) === 'Invalid Date' || isNaN(new Date(date))) res.status(200).json({
                    type: 'error',
                    message: 'Date seems invalid.'
                })
                else if(event === '') res.status(200).json({
                    type: 'error',
                    message: 'Event cannot be empty.'
                })
                else if(remark === '') res.status(200).json({
                    type: 'error',
                    message: 'Remark cannot be empty.'
                })
                else res.status(200).json({
                    type: 'error',
                    message: 'One or more fields are empty.'
                })
            }            
        }
        else{
            console.log('\u0007')

            res.status(200).json({
                type: 'error',
                message: 'Invalid request body.'
            })
        }
    }
    else{
        console.log('\u0007')

        res.status(200).json({
            type: 'error',
            message: 'FORBIDDEN.'
        })
    }
}

function isJSON(string){
    try{
        JSON.parse(string)
        return true
    }
    catch(e){
        return false
    }
}