function git-current-branch {
    git branch --no-color 2> /dev/null | grep \* | colrm 1 2
}

function set_prompt_line {
    local        BLUE="\[\033[0;34m\]"

    # OPTIONAL - if you want to use any of these other colors:
    local         RED="\[\033[0;31m\]"
    local   LIGHT_RED="\[\033[1;31m\]"
    local       GREEN="\[\033[0;32m\]"
    local LIGHT_GREEN="\[\033[1;32m\]"
    local       WHITE="\[\033[1;37m\]"
    local  LIGHT_GRAY="\[\033[0;37m\]"
    # END OPTIONAL
    local     DEFAULT="\[\033[0m\]"
    export PS1="$BLUE\w $LIGHT_RED[\$(git-current-branch)]$DEFAULT \$ "
}

set_prompt_line