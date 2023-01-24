import classes from "./FormsControls.module.css";

const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error && <span>{meta.error}</span>;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError}
        </div>
    );
}


export const Textarea = (props) => {

    const {input, meta, child, ...restProps} = props;

    return (

        <FormControl {...props}>
            <textarea {...input}{...restProps}/>
        </FormControl>

    );

}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input}{...restProps}/>
        </FormControl>
    );

}

