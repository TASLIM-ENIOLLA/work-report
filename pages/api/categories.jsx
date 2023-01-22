import categories from '/data/category'

export default function handler(_, res){
    res.status(200).json(categories)
}
