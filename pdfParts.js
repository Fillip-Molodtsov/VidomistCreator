

const getDD = (data) => {
    return {
        content: [
            ...getHeader(data),
            ...getInfoByDocType(data),
            getTable(data),
            ...getAmountInfo(data),
            dekanLabel(data.dekanPib),
            disclaimer(data.isBigunets)
        ],
        styles
    }
}

const disclaimer = (isBigunets) => {
    let str = isBigunets ? "Заліково-екзаменаційний листок екзаменатор здає особисто до деканату у день приймання іcпиту (заліку). Передавати листок через інших осіб категорично забороняється." : "Екзаменатор особисто отримує і повертає відомість до деканату."
    return {text: str, margin: [0,20,0,20]}
}

const dekanLabel = (pib) => {
    return { columns: [
            {
                // auto-sized columns have their widths based on their content
                width: 'auto',
                text: 'Декан факультету'
            },
            {
                width: 'auto',
                text: {text: pib, decoration: 'underline'}
            }
        ],
        // optional space between columns
        columnGap: 200,
        margin:[0,15,0,0]
    }
}

const getAmountInfo = data => {
    if(data.isBigunets) return []
    const {amount} = data
    return [
        { columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: 'auto',
                    text: 'Кількість студентів на екзамені /тезі /заліку'
                },
                {
                    width: 'auto',
                    text: {text: ` ${amount[0]} `, decoration: 'underline'}
                }
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,15,0,0]
        },
        { columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: 'auto',
                    text: 'Кількість студентів, які не з’явились на екзамен /тезу /залік'
                },
                {
                    width: 'auto',
                    text: {text: ` ${amount[1]} `, decoration: 'underline'}
                }
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,0,0,0]
        },
        { columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: 'auto',
                    text: 'Кількість студентів, недопущених до екзамену /тези /заліку'
                },
                {
                    width: 'auto',
                    text: {text: ` ${amount[2]} `, decoration: 'underline'}
                }
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,0,0,0]
        }
    ]
}

const getTable = (data) => {
    let res = {
        layout: {
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex === 0) ? '#CCCCCC' : null;
            }
        },
        table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 15, 'auto', 50, 30,30,30,70,30, '*' ],

            body: getTableBody(data)
        },
        margin:[-30, 0]
    }
    return res
}

const getTableBody = data => {
    const st = data.students.map( (st, idx) => [idx+1, ...st])
    return [
        [ '№', 'Прізвище,ім`я,по_батькові_сту-дента', '№_залікової книжки', 'Заробо-ту в трим.',
            'За тезу,залік, екза-мен', 'Разом', 'Національна оцінка',
            'Оцін-ка ЄКТС', 'Підпис викладача'],
        ...st,
        ['', '', '', '', '','', '', '', '' ],
        ['*', '', '', '', '','', '', '', '' ]
    ]
}

const getHeader = (data) => {
    return [
        {text: 'НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”',style:'header'},
        { columns: [
                {
                    width:'*',
                    text:''
                },
                {
                    // auto-sized columns have their widths based on their content
                    width: 'auto',
                    text:{ text: getDocTypeTitle(data.isBigunets), style:['f14']}
                },
                {
                    width: 'auto',
                    text: {text: data.docId, style:['f14', 'underline']}
                },
                {
                    width:'*',
                    text:''
                },
            ],
            // optional space between columns
            columnGap: 5,
            style: 'bold'
        },
    ]
}

const getDocTypeTitle = isBigunets => {
    return !isBigunets? 'ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ №': 'ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНИЙ ЛИСТОК №'
}

const getInfo = (data) => {
    const {headerInfo} = data
    const {vykl} = headerInfo
    return [
        { columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: 'auto',
                    text: 'Освітній рівень'
                },
                {
                    width: 'auto',
                    text: {text: headerInfo.degree, decoration: 'underline'}
                }
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,15,0,0]
        },
        { columns: [
                {
                    width: 'auto',
                    text: {text: headerInfo.faculty, decoration: 'underline'}
                },
                {
                    width: 'auto',
                    text: 'Рік навчання'
                },
                {
                    width: 'auto',
                    text: {text: headerInfo.year, decoration: 'underline'}
                },
                {
                    width: 'auto',
                    text: 'Група'
                },
                {
                    width: 'auto',
                    text:{text: headerInfo.groupId, style:['f16', 'bold']}
                },
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,0,0,0]
        },
        { columns: [
                {
                    width: 'auto',
                    text: 'Дисципліна'
                },
                {
                    width: 'auto',
                    text: {text: headerInfo.subjectTitle, style: ['underline', 'bold']}
                }
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,0,0,0]
        },
        { columns: [
                {
                    width: 'auto',
                    text: 'Семестр'
                },
                {
                    width: 'auto',
                    text: {text: ` ${headerInfo.semestr} `, decoration: 'underline'}
                },
                {
                    width: 'auto',
                    text: 'Залікові бали'
                },
                {
                    width: 'auto',
                    text: {text: headerInfo.zalikBali, style:['underline', 'bold']}
                },
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,0,0,0]
        },
        { columns: [
                {
                    width: 'auto',
                    text: 'Форма контролю:'
                },
                {
                    width: 'auto',
                    text: {text: ` ${headerInfo.controlForm} .`, decoration: 'underline'}
                },
                {
                    width: 'auto',
                    text: 'Дата'
                },
                {
                    width: 'auto',
                    text: getDate(headerInfo.date) + " р."
                },
            ],
            // optional space between columns
            columnGap: 5,
            margin:[0,0,0,0]
        },
        { columns: [
                {
                    width: '100%',
                    text:{text: getVyklInfo(vykl),style:['underline']}
                }],
            columnGap: 5,
            alignment: 'center',
            margin: [0, 10]
        },
        {text: 'Прізвище, ім’я, по батькові екзаменатора',alignment:'center', margin:[0, 0, 0,20], style:['f10']}
    ]
}

const getInfoByDocType = (data) => {
    const info = getInfo(data)
    if(data.isBigunets) {
        info.splice(info.length-3, 0, reasonH(data.reason))
    }
    return info
}

const reasonH = (reason) => {
    return {
        columns: [
            {
                // auto-sized columns have their widths based on their content
                width: 'auto',
                text: 'Причина перенесення'
            },
            {
                width: 'auto',
                text: {text: reason, decoration: 'underline'}
            }
        ],
        // optional space between columns
        columnGap: 5,
        margin: [0, 0, 0, 0]
    }
}

const getVyklInfo = (vykl) => {
    let arr = [vykl.pib]
    if (vykl.scienceDegree) arr.push(vykl.scienceDegree)
    if (vykl.zvanya) arr.push(vykl.zvanya)
    if (vykl.posada) arr.push(vykl.posada)
    return arr.join(', ')
}

const getDate = (date) => {
    date[0] = `« ${date[0]} »`
    return date.join(' ')
}

const styles = {
    header: {
        fontSize:16,
        alignment:'center',
        margin:[0, 15]
    },
    idDoc: {
        decoration: 'underline',
    },
    f14:{
        fontSize:14
    },
    f16: {
        fontSize:16
    },
    f10: {
        fontSize:10
    },
    bold: {
        bold:true
    },
    underline: {
        decoration: 'underline'
    }
}

module.exports.getDD = getDD
