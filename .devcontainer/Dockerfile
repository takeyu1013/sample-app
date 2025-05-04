FROM oven/bun:debian

# Config Bun
ENV PATH="~/.bun/bin:${PATH}"

# Update packages
RUN if [ "debian" == "alpine" ] ; then apk update ; else apt-get update ; fi

# Install Git
RUN if [ "debian" == "alpine" ] ; then apk add git ; else apt-get install -y git ; fi

RUN apt update && apt install -y \
    curl \
    xz-utils

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh
RUN apt update && apt install -y nodejs

USER bun
RUN curl -sSfL https://get.tur.so/install.sh | TURSO_INSTALL_SKIP_SIGNUP=1 bash
