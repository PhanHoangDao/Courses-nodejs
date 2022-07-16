const Handlebars= require('handlebars')

module.exports= {
    sum: (a,b) => a+b,
    sortable: (field, sort) =>{
        sort.type= ['asc','desc'].includes(sort.type) ? sort.type : 'default';
        const sortType= (field === sort.column) ? sort.type : 'default';
        const icons={
            default: 'oi oi-elevator',
            desc: 'oi oi-sort-descending',
            asc: 'oi oi-sort-ascending',
        }

        const types= {
            default: 'desc',
            desc:'asc',
            asc: 'desc',
        }
        
        const icon= icons[sortType]
        const type= types[sortType]

        const herf= Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
        const output= `<a href="${herf}" >
                <span class="${icon}"></span>
                </a>`
        return new Handlebars.SafeString(output);
    },
  }