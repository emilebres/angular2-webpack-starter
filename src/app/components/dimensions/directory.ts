export class Directory{

    expanded = false;
    checked = false;

    constructor(
        public id: number,
        public code: string,
        public name:string,
        checked: boolean,
        expanded: boolean,
        public id_fth?: number,
        public directories?:Directory[],
        public files?:string[]) {
        this.directories = directories || [];
        this.files = files || [];
        this.checked = checked;
        this.expanded = expanded;
        }

    toggle(){
        this.expanded = !this.expanded;
    }

    getIcon(){
        if (this.directories.length === 0){
            return ' ';
        }

        if(this.expanded){
            return '-';
        }

        return '+';
    }

    check(){
        this.checked = !this.checked;
        // this.checkRecursive(this.checked);
    }

    checkRecursive(state:boolean){
        this.directories.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        });
    }

    getChecked (res) : Directory[]{
        if (this.checked) { res.push(this.code) }
        this.directories.forEach(d =>
            [...res,d.getChecked(res)]
            );
        return res;
    }
}
