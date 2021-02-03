class abstractService {

    constructor() {
        
    }
    
    setModel(model){
        this.model = model
        return this
    }

    setRelations(relations){
        this.relations = relations

        return this
    }
    
    async showAll(options){        
        const rows = await this.model.findAll({
            ...options,
            ...this.relations
        })

        return rows || []
    }

    async getOne(options){
        const row = await this.model.findOne({
            ...options,
            ...this.relations
        })
        
        return row || {}
    }

    async findOrCreate(options,toCreate) {
        
        let row = await this.model.findOne({
            ...options,
            ...this.relations
        })

        if (!row) {
            row = await this.create(toCreate)
        }
        
        return row || {}
    }

    async updateOrCreate(options,toCreate) {
        
        let row = await this.model.findOne({
            ...options,
            ...this.relations
        })

        if (!row) {
            row = await this.update(toCreate)
        }
        
        return row || {}
    }

    async Update(options,toUpdate){

        options.returning = true        

        const row = await this.model.update(toUpdate,options)
        return row[1] || []
    }

    async Create(toCreate){
    
        const row = await this.model.create(toCreate)
        return row || {}
    }

    async Delete(options){

        options.returning = true        

        const row = await this.model.destroy(options)
        return row || {}
    }
    
}

export default abstractService;