function StudentInfo(props) {
    return (
        <>
            <p>Họ tên: {props.name}</p>
            <p>MSSV: {props.id}</p>
            <p>Lớp: {props.class}</p>
        </>
    );
}
export default StudentInfo;