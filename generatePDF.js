// Função principal para a criação do PDF.
function generatePDF(){
    // Informando as propriedades de como serão as configurações da folha do pdf.
    const properties = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       }

    // Criando a instancia pdf
    let pdf = new jspdf.jsPDF(properties)
    
    //###########################################################################################
    // Gerando a tabela automaticamente com os dados vindo da tabela do HTML.
    //###########################################################################################
    pdf.autoTable({
        // Propriedade que irá buscar no html o id da tabela e fazer a criação automática.
        html: '#myTable', 
        
        // Margens da tabela
        margin: {
            top: 50,
            bottom: 20
        },

        // Propriedade de estilo para colunas específicas
        // Aqui eu estou deixando mais largo a coluna de 'Nome do Produto'.
        columnStyles: { 
            1 : {cellWidth: 50}, 
        },

        // Estilo do Header da tabela.
        headStyles: {
            halign : 'center',
            valign : 'middle',
            fillColor: '#ffffff',
            textColor: '#000000'
        },

        // Estilo do corpo da tabela.
        bodyStyles: {
            textColor: '#000000',
            halign: 'center'
        },

        // Propriedade que irá fazer a quebra da página, caso o texto presente nas células
        // for maior que o tamanho da página e sempre respeitando a margem.
        pageBreak: 'auto',

        // Propriedade que irá ajudar no desenho da página, adicionando todas as características do
        // cabeçalho e rodapé.
        didDrawPage: () => {
            //###########################################################################################
            // Criando um Cabeçalho para todas as páginas do PDF caso existam várias páginas.
            //###########################################################################################
            pdf.addImage(codeBase64Image, 'PNG', 5, 8, 40, 40)
    
            pdf.setFontSize(20);
            pdf.text("NOME DA EMPRESA PURAMENTE DE TESTE", 40, 30)

            pdf.setFontSize(12);
            pdf.text("Relatorio mensal dos produtos em estoque.", 40, 35)

            var text = "Relatório verificado pelos analistas e liberado pelo diretor - " + dataTemplate()
            var valueCenterX = calculatedValueCenterX(pdf, text)
            pdf.text(text, valueCenterX, 290);

            // Linhas do header da tabela.
            pdf.line(14, 50, 195.8, 50, 'F')
            pdf.line(14, 61.7, 195.8, 61.7, 'F')
        }
    }) 

    // Chamada da função que irá fazer a numeração das páginas.
    handlePageNumbering(pdf)
    
    //###########################################################################################
    // Salvando o relatório em PDF. 
    //########################################################################################### 
    pdf.save("Table.pdf")
}


// Função tem como objetivo de gerar a data que o PDF for gerado com um formato de DD/MM/AAAA.
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

// Função que irá fazer o calculo de onde o texto do rodapé irá começar,
// com a ideia de deixar centralizado.
function calculatedValueCenterX(pdf, text){
    var textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var textOffset = (pdf.internal.pageSize.width - textWidth) / 2;
    
    return textOffset
}

// Função que irá numerar as páginas do PDF.
function handlePageNumbering(pdf){
    const pageCount = pdf.internal.getNumberOfPages()
    var count = 1
    
    for(count ; count <= pageCount ; count++){
        pdf.setPage(count)
        pdf.setFontSize(9);
        pdf.text(String(count), 200, 290)
    } 
}