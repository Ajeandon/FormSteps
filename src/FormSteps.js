/**
 * FormSteps | simple javascript class to create easily forms with steps
 * @author : Alexandre JEANDON <alexandre.jdweb@gmail.com>
 */
class FormSteps {

    constructor(form_id, opt = {}) {
        this.form_id = form_id
        this.form_btn_next_id = opt.form_btn_next_id || 'form_next
        this.form_btn_prev_id = opt.form_btn_prev_id || 'form_prev'
        this.steps  = []
        this.current_step = opt.current_step || 0
        this.stepClass = opt.stepClass || 'step'
        this.registerEvents()
    }

    registerEvents() {
        document.getElementById(this.form_btn_next_id).addEventListener('click', this.next.bind(this))
        document.getElementById(this.form_btn_prev_id).addEventListener('click', this.prev.bind(this))
    }

    addStep(id, validator = null) {
        this.steps.push({
            id: id,
            validator: validator
        })

        return this
    }

    next() {
        this.current_step++
        this.render()
    }

    displayNextBtn() {
        document.getElementById(this.form_btn_next_id).style.display = ''
    }

    hideNextBtn() {
        document.getElementById(this.form_btn_next_id).style.display = 'none'
    }

    prev() {
        this.current_step--
        this.render()
    }

    displayPrevBtn() {
        document.getElementById(this.form_btn_prev_id).style.display = ''
    }

    hidePrevBtn() {
        document.getElementById(this.form_btn_prev_id).style.display = 'none'
    }

    getCurrentEl() {
        return document.getElementById(this.steps[this.current_step].id)
    }

    render() {
        document.querySelectorAll(`.${this.stepClass}`).forEach((el) => {
            el.style.display = 'none'
        })

        this.getCurrentEl().style.display = 'block'

        if (this.current_step == 0) {
            this.hidePrevBtn()
            this.displayNextBtn()
        } else if (this.current_step >= (this.steps.length - 1)) {
            this.hideNextBtn()
            this.displayPrevBtn()
        } else {
            this.displayNextBtn()
            this.displayPrevBtn()
        }
    }
}

export default FormSteps
