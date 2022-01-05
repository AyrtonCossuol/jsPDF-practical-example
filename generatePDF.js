function generatePDF(){
    let pdf = new jspdf.jsPDF()

    pdf.autoTable({html: '#myTable'})
    
    pdf.save("Table.pdf")
}