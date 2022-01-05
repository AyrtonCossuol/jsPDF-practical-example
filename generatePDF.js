function generatePDF(){
    // Informando as propriedades de como será as configurações da folha do pdf.
    const properties = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       }

    // Criando a instancia pdf
    let pdf = new jspdf.jsPDF(properties)
    
    // Criando um Cabeçalho padrão para o pdf.

    // Gerando a tabela automaticamente com os dados vindo da tabela do HTML.
    pdf.autoTable({html: '#myTable'})

    // Adicionando algumas caracteristicas

    // Salvando o relatorio em PDF.   
    pdf.save("Table.pdf")
}