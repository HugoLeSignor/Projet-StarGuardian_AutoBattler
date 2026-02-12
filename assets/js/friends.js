/* ================================
   FRIEND SYSTEM
================================ */

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-friends-toggle]');
    const panel = document.querySelector('[data-friends-panel]');
    const backdrop = document.querySelector('[data-friends-backdrop]');
    const closeBtn = document.querySelector('[data-friends-close]');
    const badge = document.querySelector('[data-friends-badge]');

    if (!toggle || !panel) return;

    let panelOpen = false;
    let currentTab = 'friends';
    let currentConversationUserId = null;
    let lastMessageId = 0;
    let messagePollingInterval = null;
    let unreadPollingInterval = null;
    let friendsLoaded = false;
    let requestsLoaded = false;

    // ==========================================
    // PANEL OPEN/CLOSE
    // ==========================================
    function openPanel() {
        panel.style.display = 'flex';
        backdrop.style.display = 'block';
        panel.offsetHeight; // reflow
        panel.classList.add('friends-panel--open');
        backdrop.classList.add('friends-panel__backdrop--open');
        panelOpen = true;

        if (!friendsLoaded) {
            loadFriends();
        }
    }

    function closePanel() {
        panel.classList.remove('friends-panel--open');
        backdrop.classList.remove('friends-panel__backdrop--open');
        panelOpen = false;
        stopMessagePolling();
        setTimeout(() => {
            panel.style.display = 'none';
            backdrop.style.display = 'none';
        }, 300);
    }

    toggle.addEventListener('click', () => panelOpen ? closePanel() : openPanel());
    closeBtn.addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);

    // ==========================================
    // TABS
    // ==========================================
    document.querySelectorAll('[data-friends-tab]').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            const tabName = tabBtn.dataset.friendsTab;
            switchTab(tabName);
        });
    });

    function switchTab(tabName) {
        currentTab = tabName;

        document.querySelectorAll('[data-friends-tab]').forEach(btn => {
            btn.classList.toggle('friends-panel__tab--active', btn.dataset.friendsTab === tabName);
        });

        document.querySelectorAll('[data-tab-content]').forEach(content => {
            content.style.display = content.dataset.tabContent === tabName ? 'block' : 'none';
        });

        document.querySelector('.friends-panel__tabs').style.display = 'flex';
        document.querySelector('.friends-panel__content').style.display = 'block';
        document.querySelector('[data-friends-conversation]').style.display = 'none';
        stopMessagePolling();

        if (tabName === 'friends' && !friendsLoaded) loadFriends();
        if (tabName === 'requests' && !requestsLoaded) loadRequests();
    }

    // ==========================================
    // LOAD FRIENDS LIST
    // ==========================================
    function loadFriends() {
        const container = document.querySelector('[data-tab-content="friends"]');
        container.innerHTML = '<div class="friends-panel__loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';

        fetch('/friends/list', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(res => res.json())
        .then(data => {
            friendsLoaded = true;
            if (data.friends.length === 0) {
                container.innerHTML = '<p class="friends-panel__empty"><i class="fas fa-ghost"></i> Aucun compagnon... Le donjon est solitaire.</p>';
                return;
            }

            container.innerHTML = data.friends.map(f => `
                <div class="friend-item" data-friend-user-id="${f.userId}">
                    <div class="friend-item__avatar">
                        ${f.profileImage
                            ? `<img src="${escapeHtml(f.profileImage)}" alt="${escapeHtml(f.username)}">`
                            : '<i class="fas fa-user"></i>'}
                    </div>
                    <div class="friend-item__info">
                        <span class="friend-item__name">${escapeHtml(f.username)}</span>
                        <span class="friend-item__preview">
                            ${f.lastMessage
                                ? (f.lastMessage.isFromMe ? 'Vous: ' : '') + escapeHtml(f.lastMessage.content)
                                : 'Aucun message'}
                        </span>
                    </div>
                    <span class="friend-item__rating"><i class="fas fa-trophy"></i> ${f.rating}</span>
                </div>
            `).join('');

            container.querySelectorAll('.friend-item').forEach(item => {
                item.addEventListener('click', () => {
                    const userId = parseInt(item.dataset.friendUserId);
                    const name = item.querySelector('.friend-item__name').textContent;
                    openConversation(userId, name);
                });
            });
        })
        .catch(() => {
            container.innerHTML = '<p class="friends-panel__empty">Erreur de chargement</p>';
        });
    }

    // ==========================================
    // LOAD PENDING REQUESTS
    // ==========================================
    function loadRequests() {
        const container = document.querySelector('[data-tab-content="requests"]');
        container.innerHTML = '<div class="friends-panel__loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';

        fetch('/friends/pending', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(res => res.json())
        .then(data => {
            requestsLoaded = true;
            if (data.requests.length === 0) {
                container.innerHTML = '<p class="friends-panel__empty">Aucune demande en attente</p>';
                return;
            }

            container.innerHTML = data.requests.map(r => `
                <div class="friend-item" data-request-id="${r.friendshipId}">
                    <div class="friend-item__avatar">
                        ${r.profileImage
                            ? `<img src="${escapeHtml(r.profileImage)}" alt="${escapeHtml(r.username)}">`
                            : '<i class="fas fa-user"></i>'}
                    </div>
                    <div class="friend-item__info">
                        <span class="friend-item__name">${escapeHtml(r.username)}</span>
                        <span class="friend-item__preview">${escapeHtml(r.date)}</span>
                    </div>
                    <div class="friend-item__actions">
                        <button class="friend-action friend-action--accept" data-accept-id="${r.friendshipId}">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="friend-action friend-action--reject" data-reject-id="${r.friendshipId}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('[data-accept-id]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleRequest(btn.dataset.acceptId, 'accept');
                });
            });

            container.querySelectorAll('[data-reject-id]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleRequest(btn.dataset.rejectId, 'reject');
                });
            });
        })
        .catch(() => {
            container.innerHTML = '<p class="friends-panel__empty">Erreur de chargement</p>';
        });
    }

    function handleRequest(friendshipId, action) {
        fetch(`/friends/${action}/${friendshipId}`, {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                friendsLoaded = false;
                requestsLoaded = false;
                loadRequests();
                fetchUnreadCount();
            }
        });
    }

    // ==========================================
    // SEARCH USERS
    // ==========================================
    const searchInput = document.querySelector('[data-friends-search-input]');
    const searchResults = document.querySelector('[data-friends-search-results]');
    let searchTimeout = null;

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            const query = searchInput.value.trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            searchTimeout = setTimeout(() => {
                fetch(`/friends/search?q=${encodeURIComponent(query)}`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.users.length === 0) {
                        searchResults.innerHTML = '<p class="friends-panel__empty">Aucun guerrier trouve</p>';
                        return;
                    }

                    searchResults.innerHTML = data.users.map(u => {
                        let actionHtml = '';
                        if (u.friendStatus === 'accepted') {
                            actionHtml = '<span class="friend-action friend-action--pending">Ami</span>';
                        } else if (u.friendStatus === 'pending_sent') {
                            actionHtml = '<span class="friend-action friend-action--pending">Envoyee</span>';
                        } else if (u.friendStatus === 'pending_received') {
                            actionHtml = '<span class="friend-action friend-action--pending">Recue</span>';
                        } else {
                            actionHtml = `<button class="friend-action friend-action--add" data-add-friend-id="${u.userId}">
                                <i class="fas fa-plus"></i>
                            </button>`;
                        }

                        return `
                            <div class="friend-item">
                                <div class="friend-item__avatar">
                                    ${u.profileImage
                                        ? `<img src="${escapeHtml(u.profileImage)}" alt="${escapeHtml(u.username)}">`
                                        : '<i class="fas fa-user"></i>'}
                                </div>
                                <div class="friend-item__info">
                                    <span class="friend-item__name">${escapeHtml(u.username)}</span>
                                    <span class="friend-item__rating"><i class="fas fa-trophy"></i> ${u.rating}</span>
                                </div>
                                <div class="friend-item__actions">${actionHtml}</div>
                            </div>
                        `;
                    }).join('');

                    searchResults.querySelectorAll('[data-add-friend-id]').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            sendFriendRequest(btn.dataset.addFriendId, btn);
                        });
                    });
                });
            }, 300);
        });
    }

    function sendFriendRequest(userId, btn) {
        btn.disabled = true;
        fetch(`/friends/request/${userId}`, {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                btn.outerHTML = '<span class="friend-action friend-action--pending">Envoyee</span>';
            } else {
                btn.disabled = false;
            }
        })
        .catch(() => { btn.disabled = false; });
    }

    function reportMessageAction(messageId, btn) {
        const reason = prompt('Raison du signalement :');
        if (reason === null) return; // cancelled

        btn.disabled = true;
        fetch(`/friends/messages/${messageId}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ reason: reason })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.classList.add('chat-message__report--done');
                btn.title = 'Signale';
            } else {
                btn.disabled = false;
            }
        })
        .catch(() => { btn.disabled = false; });
    }

    // ==========================================
    // CONVERSATION
    // ==========================================
    function openConversation(userId, username) {
        currentConversationUserId = userId;
        lastMessageId = 0;

        document.querySelector('.friends-panel__tabs').style.display = 'none';
        document.querySelector('.friends-panel__content').style.display = 'none';
        const convEl = document.querySelector('[data-friends-conversation]');
        convEl.style.display = 'flex';

        document.querySelector('[data-conversation-name]').textContent = username;
        const messagesEl = document.querySelector('[data-conversation-messages]');
        messagesEl.innerHTML = '<div class="friends-panel__loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';

        fetch(`/friends/messages/${userId}`, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(res => res.json())
        .then(data => {
            renderMessages(data.messages, false);
            startMessagePolling();
        });
    }

    function renderMessages(messages, append) {
        const messagesEl = document.querySelector('[data-conversation-messages]');

        if (!append) {
            if (messages.length === 0) {
                messagesEl.innerHTML = '<p class="friends-panel__empty">Debut de la conversation. Envoyez le premier message!</p>';
            } else {
                messagesEl.innerHTML = '';
            }
        }

        // Si on ajoute des messages et que le conteneur affiche le placeholder, le supprimer
        if (append && messages.length > 0) {
            const placeholder = messagesEl.querySelector('.friends-panel__empty');
            if (placeholder) placeholder.remove();
        }

        messages.forEach(msg => {
            if (msg.id > lastMessageId) lastMessageId = msg.id;

            const div = document.createElement('div');
            div.classList.add('chat-message', msg.isFromMe ? 'chat-message--mine' : 'chat-message--theirs');

            let reportBtn = '';
            if (!msg.isFromMe) {
                reportBtn = `<button class="chat-message__report" data-report-msg-id="${msg.id}" title="Signaler ce message"><i class="fas fa-flag"></i></button>`;
            }

            div.innerHTML = `
                ${escapeHtml(msg.content)}
                <span class="chat-message__time">${escapeHtml(msg.date)} ${reportBtn}</span>
            `;

            // Attach report handler
            const reportEl = div.querySelector('[data-report-msg-id]');
            if (reportEl) {
                reportEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    reportMessageAction(reportEl.dataset.reportMsgId, reportEl);
                });
            }

            messagesEl.appendChild(div);
        });

        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // Send message
    const sendBtn = document.querySelector('[data-conversation-send]');
    const inputEl = document.querySelector('[data-conversation-input]');

    if (sendBtn && inputEl) {
        sendBtn.addEventListener('click', sendMessage);
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        const content = inputEl.value.trim();
        if (!content || !currentConversationUserId) return;

        inputEl.value = '';

        fetch(`/friends/messages/${currentConversationUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ content: content })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success && data.message) {
                renderMessages([data.message], true);
            }
        });
    }

    // Back button
    const backBtn = document.querySelector('[data-conversation-back]');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            currentConversationUserId = null;
            stopMessagePolling();
            friendsLoaded = false;
            switchTab('friends');
        });
    }

    // ==========================================
    // MESSAGE POLLING (every 5s when conversation open)
    // ==========================================
    function startMessagePolling() {
        stopMessagePolling();
        messagePollingInterval = setInterval(() => {
            if (!currentConversationUserId) return;

            fetch(`/friends/messages/${currentConversationUserId}?afterId=${lastMessageId}`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
            .then(res => res.json())
            .then(data => {
                if (data.messages && data.messages.length > 0) {
                    renderMessages(data.messages, true);
                }
            });
        }, 5000);
    }

    function stopMessagePolling() {
        if (messagePollingInterval) {
            clearInterval(messagePollingInterval);
            messagePollingInterval = null;
        }
    }

    // ==========================================
    // UNREAD COUNT POLLING (every 30s, always active)
    // ==========================================
    function fetchUnreadCount() {
        fetch('/friends/unread-count', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(res => res.json())
        .then(data => {
            if (data.total > 0) {
                badge.textContent = data.total;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }

            const requestsBadge = document.querySelector('[data-requests-badge]');
            if (requestsBadge) {
                if (data.pendingRequests > 0) {
                    requestsBadge.textContent = data.pendingRequests;
                    requestsBadge.style.display = 'inline-block';
                } else {
                    requestsBadge.style.display = 'none';
                }
            }
        })
        .catch(() => {});
    }

    fetchUnreadCount();
    unreadPollingInterval = setInterval(fetchUnreadCount, 30000);
});
