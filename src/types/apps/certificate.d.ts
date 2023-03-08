export interface ICertificate {
    _id: string,
    title: string,
    course: string,
}

// CERTFICATE TESTS
export interface ICertificateTest {
    _id: string,
    course: string,
    certificate: string,
    survey: string,
    createdAt: string,
}