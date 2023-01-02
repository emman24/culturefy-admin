import React, { useState, useEffect } from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Button } from '@mui/material'

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// interface IDownload {
//     document: React.ReactElement<ReactPDF.DocumentProps, string | React.JSXElementConstructor<any>>
// }



export const DownLoadReport = (
    { report }: { report: any }
) => {
    // console.log('===========REPORT===================');
    // console.log(report);
    // console.log('====================================');

    const [isShow, setIsShow] = useState<boolean>(false)

    useEffect(() => {

        return () => {
            setIsShow(false)
        }
    }, [])

    const ReportPdf = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #3</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #4</Text>
                </View>
            </Page>
        </Document>
    )

    return (
        <>
            {
                isShow ? (
                    <PDFDownloadLink document={<ReportPdf />} fileName={`${report.name}.pdf`}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : (
                            <Button onClick={() => console.log(report)} fullWidth>
                                <IosShareIcon /> Download
                            </Button>
                        ))}
                    </PDFDownloadLink>
                ) : (
                    <Button onClick={() => setIsShow(true)} fullWidth>
                        <IosShareIcon /> Exports
                    </Button>
                )
            }
        </>
    )
}

// const ViewReportPdf = () => {
//     return (
//     )
// }

// export default ViewReportPdf
