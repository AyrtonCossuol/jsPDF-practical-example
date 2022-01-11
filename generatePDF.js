function generatePDF(){
    // Informando as propriedades de como será as configurações da folha do pdf.
    const properties = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
        // Para A4 em 'mm', as dimensoes sao [595.28, 841.89]
       }

    // Criando a instancia pdf
    let pdf = new jspdf.jsPDF(properties)
    //var date
    
    //###########################################################################################
    // Criando um Cabeçalho padrão para o pdf.
    //###########################################################################################

    

    //###########################################################################################
    // Gerando a tabela automaticamente com os dados vindo da tabela do HTML.
    //###########################################################################################
    pdf.autoTable({
        html: '#myTable', 
        
        margin: {
            top: 50,
            bottom: 20
        },

        columnStyles: { 
            1 : {cellWidth: 50}, 
        },

        headStyles: {
            halign : 'center',
            valign : 'middle',
            fillColor: '#ffffff',
            textColor: '#000000'
        },

        bodyStyles: {
            textColor: '#000000',
            halign: 'center'
        },

        didDrawPage: (data) => {
            pdf.addImage(codeBase64Image, 'PNG', 5, 8, 40, 40)
    
            pdf.setFontSize(20);
            pdf.text("NOME DA EMPRESA PURAMENTE DE TESTE", 40, 30)

            pdf.setFontSize(12);
            pdf.text("Relatorio mensal dos produtos em estoque.", 40, 35)

            var text = "Relatório verificado pelos analistas e liberado pelo diretor - " + dataTemplate()
            var valueCenterX = calculatedValueCenterX(pdf, text)
            pdf.text(text, valueCenterX, 290);

            // Linhas do header da tabela
        pdf.line(14, 50, 195.8, 50, 'F')
        pdf.line(14, 61.7, 195.8, 61.7, 'F')
        }
    })

    //###########################################################################################
    // Adicionando algumas caracteristicas
    //###########################################################################################
    

    

    handlePageNumbering(pdf)
    
    //###########################################################################################
    // Salvando o relatorio em PDF.  
    //########################################################################################### 
    pdf.save("Table.pdf")
}

function dataTemplate(){
    var hoje = new Date()
    var stringDate = ''
    var stringMonth = ''
    var stringDateFinal = ''

    if (hoje.getDate() < 10){
        stringDate = '0' + String(hoje.getDate())
    } else {
        stringDate = String(hoje.getDate())
    }

    if ((hoje.getMonth() + 1) < 10){
        stringMonth = '0' + String(hoje.getMonth() + 1)
    } else {
        stringMonth = String(hoje.getMonth() + 1)
    }
    
    stringDateFinal = stringDate + '/' + stringMonth + '/' + String(hoje.getFullYear())
    
    return stringDateFinal
}

function calculatedValueCenterX(pdf, text){
    var textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var textOffset = (pdf.internal.pageSize.width - textWidth) / 2;
    
    return textOffset
}

function handlePageNumbering(pdf){
    const pageCount = pdf.internal.getNumberOfPages()
    var count = 1
    
    for(count ; count <= pageCount ; count++){
        pdf.setPage(count)
        pdf.text(String(count), 200, 290)
    } 
}